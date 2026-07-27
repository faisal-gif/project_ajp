<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsFormRequest;
use App\Models\KategoriKt;
use App\Models\News;
use App\Models\NewsAddonRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\ImageManager;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $auth = Auth::user();

        $query = News::query()
            ->select(
                'id',
                'title',
                'status',
                'created'
            )
            ->with('addonRequests'); // Tambahkan baris ini agar data request add-ons ikut terkirim ke Frontend

        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $search = $request->search;

                if (is_numeric($search)) {
                    $q->where('id', $search);
                } else {
                    $q->where('title', 'like', "%{$search}%");
                }
            });
        }

        // Filter status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $query->where('pewarta_id', $auth->id);

        // Optimized sorting
        $query->orderBy('created', 'DESC');

        // Faster pagination
        $news = $query->simplePaginate(10)->withQueryString();

        return Inertia::render('News/Index', [
            'news'    => $news,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        if ($user->quota_news <= 0) {
            return redirect()->route('news.index')->with('error', 'Quota berita Anda telah habis.');
        }

        if ($user->dateexp < now()) {
            return redirect()->route('news.index')->with('error', 'Masa aktif akun Anda telah berakhir. Silakan perbarui langganan Anda.');
        }


        return Inertia::render('News/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NewsFormRequest $request)
    {
        $auth = Auth::user();
        $title = $request->title;

        $cleanTitle = preg_replace('/[^\x00-\x{FFFF}]/u', '', $request->title);
        $cleanContent = preg_replace('/[^\x00-\x{FFFF}]/u', '', $request->content);
        $cleanCaption = preg_replace('/[^\x00-\x{FFFF}]/u', '', $request->caption);

        $image_1 = null;
        $image_2 = null;
        $image_3 = null;

        do {
            $is_code = 'AJP' . strtoupper(Str::random(8));
        } while (News::where('is_code', $is_code)->exists());

        DB::beginTransaction();

        try {
            // Jika file bermasalah, fungsi storeImage akan menghasilkan Exception
            if ($request->hasFile('image')) {
                $image_1 = $this->storeImage($request->file('image'), $title . '-1');
            }

            if ($request->hasFile('image_2')) {
                $image_2 = $this->storeImage($request->file('image_2'), $title . '-2');
            }

            if ($request->hasFile('image_3')) {
                $image_3 = $this->storeImage($request->file('image_3'), $title . '-3');
            }

            News::create([
                'is_code' => $is_code,
                'title'     => $cleanTitle,
                'content'   => $cleanContent,
                'city' => $request->city,
                'narsum' => $request->narsum,
                'profesi' => $request->profesi,
                'contact' => $request->contact,
                'datetime' => now(),
                'image' => $image_1 ? url(Storage::url($image_1)) : null,
                'image2' => $image_2 ? url(Storage::url($image_2)) : null,
                'image3' => $image_3 ? url(Storage::url($image_3)) : null,
                'caption'   => $cleanCaption,
                'pewarta_id' => $auth->id,
                'type' => $auth->type,
                'status' => 0
            ]);

            $user = User::find($auth->id);
            $user->quota_news = $user->quota_news - 1;
            $user->save();

            DB::commit();

            return redirect()->route('news.index')->with('success', 'Berita berhasil ditambahkan.');
        } catch (Exception $e) {
            // Batalkan semua query database jika ada gambar yang gagal diproses
            DB::rollBack();

            // Catat error aslinya di file storage/logs/laravel.log untuk keperluan debugging
            Log::error('Gagal upload gambar saat membuat berita: ' . $e->getMessage());

            // Kembalikan user ke form dengan input sebelumnya dan pesan error
            return back()->withInput()->with('error', 'Gagal memproses gambar. Pastikan file gambar tidak rusak dan coba lagi.');
        }
    }

    private function storeImage($image, $title)
    {
        $slug = Str::slug($title);
        $manager = new ImageManager(new Driver());
        $image = $manager->read($image);

        // Ubah bagian ini dengan menambahkan angka 75 untuk kualitasnya
        $encode = $image->toJpeg(75);

        $path = 'images/berita/' . $slug . '-' . time() . '.jpeg';
        Storage::disk('public')->put($path, $encode);

        return $path;
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return Inertia::render('News/Show', [
            'news' => $news,
        ]);
    }


    public function apiShow($id)
    {
        $news = News::with('writer:id,nama')->find($id);

        if (!$news) {
            return response()->json([
                'error' => true
            ], 404);
        }

        return response()->json([
            'error' => false,
            'data' => [
                'is_code' => $news->is_code,
                'datetime' => $news->datetime,
                'title'    => $news->title,
                'image' => $news->image,
                'caption'  => $news->caption,
                'content'  => $news->content,
                'city'     => $news->city,
                'writer'   => optional($news->writer)->nama,
            ]
        ]);
    }

    public function requestAddon(Request $request, News $news)
    {
        $request->validate([
            'jenis_request' => 'required|in:feed_instagram,ekoran,wa_channel'
        ]);

        $user = Auth::user();
        $jenis = $request->jenis_request;

        // 1. Cek apakah sudah pernah request dan statusnya belum ditolak
        $existingRequest = NewsAddonRequest::where('news_id', $news->id)
            ->where('jenis_request', $jenis)
            ->whereIn('status', ['pending', 'processing', 'completed'])
            ->first();

        if ($existingRequest) {
            return back()->with('error', 'Berita ini sudah diajukan untuk ' . str_replace('_', ' ', $jenis));
        }

        // 2. Cek apakah kuota masih ada
        if ($user->$jenis <= 0) {
            return back()->with('error', 'Kuota ' . str_replace('_', ' ', $jenis) . ' Anda sudah habis!');
        }

        // 3. Mulai Transaksi Database
        DB::beginTransaction();
        try {
            // Potong kuota user
            $user->decrement($jenis, 1);

            // Masukkan ke tabel antrean
            NewsAddonRequest::create([
                'news_id' => $news->id,
                'wartawan_id' => $user->id,
                'jenis_request' => $jenis,
                'type' => '1',
                'status' => 'pending'
            ]);

            DB::commit();
            return back()->with('success', 'Permintaan ' . str_replace('_', ' ', $jenis) . ' berhasil dikirim ke redaksi.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan sistem saat memproses request.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        //
    }
}
