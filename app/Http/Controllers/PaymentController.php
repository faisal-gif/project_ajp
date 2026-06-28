<?php

namespace App\Http\Controllers;

use App\Models\NewsPackage;
use App\Models\Payments;
use App\Services\TripayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function store(Request $request, TripayService $tripayService)
    {
        $user = Auth::user();

        // 1. Ambil data paket
        $newsPackage = NewsPackage::find($request->package_id);

        // (Opsional) Validasi jika paket tidak ditemukan
        if (!$newsPackage) {
            return back()->with('error', 'Paket langganan tidak ditemukan.');
        }

        $merchant_ref = 'SUB-' . time();

        // 2. Cek apakah ada transaksi pending yang masih aktif
        $payment = Payments::where('user_id', $user->id)
            ->where('package_id', $newsPackage->id)
            ->where('status', 'pending')
            ->where('method', $request->paymentMethod)
            ->where('expired_at', '>', now())
            ->latest()
            ->first();

        if ($payment) {
            return redirect($payment->checkout_url);
        }

        // 3. Mulai proses transaksi database & API
        DB::beginTransaction();

        try {
            // Buat record pembayaran awal
            $payment = Payments::create([
                'user_id'      => $user->id,
                'method'       => $request->paymentMethod,
                'package_id'   => $newsPackage->id,
                'merchant_ref' => $merchant_ref,
                'amount'       => $newsPackage->price,
                'status'       => 'pending',
            ]);

            // Request ke Tripay
            $response = $tripayService->createTransaction($newsPackage, $user, $merchant_ref, $request->paymentMethod);

            // 4. Validasi respon Tripay
            // Pastikan $response adalah array, sukses, dan memiliki key 'data'
            if (is_array($response) && isset($response['success']) && $response['success'] === true && isset($response['data'])) {

                // Jika sukses, update record pembayaran dengan data dari Tripay
                $payment->update([
                    'expired_at'   => now()->addHours(24),
                    'reference'    => $response['data']['reference'],
                    'checkout_url' => $response['data']['checkout_url'],
                ]);

                // Simpan permanen ke database
                DB::commit();

                // Arahkan user ke halaman pembayaran
                return redirect($payment->checkout_url);
            } else {
                // Jika Tripay gagal merespon dengan benar (saldo habis, koneksi gagal, dsb)
                DB::rollBack(); // Batalkan pembuatan $payment di database

                // Kembalikan user dengan pesan error
                return back()->with('error', 'Gagal memproses pembayaran ke pihak ketiga (Tripay). Silakan coba metode lain atau ulangi nanti.');
            }
        } catch (\Exception $e) {
            // Jika terjadi error pada kode di dalam blok try (misal: database down)
            DB::rollBack();

            // Catat error aslinya ke log (storage/logs/laravel.log) agar mudah diperbaiki nanti
            Log::error('Payment Error: ' . $e->getMessage());

            return back()->with('error', 'Terjadi kesalahan sistem internal. Silakan coba beberapa saat lagi.');
        }
    }
}
