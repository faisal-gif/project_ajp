<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsPackage;
use App\Models\Pengumuman;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $auth = Auth::user();

        $total_news = News::where('pewarta_id', $auth->id)->count();
        $total_pending_news = News::where('pewarta_id', $auth->id)->where('status', 0)->count();
        $total_publish_news = News::where('pewarta_id', $auth->id)->where('status', 1)->count();

        // Ambil data paket langganan untuk menghitung batas kuota & persentase
        $paket_terdaftar = NewsPackage::find($auth->package_id);

        // Ambil Pengumuman yang sedang aktif
        $now = Carbon::now();
        $pengumuman = Pengumuman::where('is_active', true)
            ->where(function ($query) use ($now) {
                $query->whereNull('start_date')->orWhere('start_date', '<=', $now);
            })
            ->where(function ($query) use ($now) {
                $query->whereNull('end_date')->orWhere('end_date', '>=', $now);
            })
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Dashboard', [
            'auth_user'       => $auth,
            'total_news'      => $total_news,
            'pending_news'    => $total_pending_news,
            'publish_news'    => $total_publish_news,
            'paket_terdaftar' => $paket_terdaftar,
            'pengumuman'      => $pengumuman,
        ]);
    }
}
