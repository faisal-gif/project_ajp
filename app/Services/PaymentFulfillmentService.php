<?php

namespace App\Services;

use App\Mail\PaymentSuccessfulMail;
use App\Models\NewsPackage;
use App\Models\Payments;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

/**
 * Pengaktifan member setelah pembayaran lunas.
 *
 * Dulu isi metode ini berada langsung di dalam TripayCallbackController. Dipindah ke
 * sini karena sekarang ada DUA pemicu: callback Tripay, dan tombol "Cek status" di
 * halaman pembayaran yang menanyakan langsung ke Tripay saat callbacknya terlambat
 * atau gagal. Menyalin logika ini ke dua tempat adalah cara paling pasti
 * menghasilkan kuota dobel atau komisi dobel.
 *
 * Isi AJP sengaja lebih sedikit daripada Kopi TIMES (satu counter, tanpa merchandise);
 * itu perilaku yang sudah berjalan dan dipertahankan.
 *
 * Isinya dipindah apa adanya, bukan ditulis ulang. Dua hal yang TIDAK boleh diubah:
 *
 *   1. Baris payment dikunci di dalam transaksi lalu statusnya diperiksa ULANG.
 *      Itu yang membuat dua pemicu yang datang bersamaan aman.
 *   2. Komisi afiliasi dicatat SEBELUM user dimutasi, karena
 *      AffiliateCommissionService::isNewMemberSale() membaca status aktif user.
 *      Menukar urutannya membuat setiap member baru terdeteksi sebagai perpanjangan,
 *      dan komisi berhenti terbit tanpa satu pun error.
 */
class PaymentFulfillmentService
{
    /**
     * Tandai lunas dan aktifkan membernya.
     *
     * $dataTripay menerima payload callback maupun respons /transaction/detail —
     * keduanya memakai nama field yang sama untuk nominal.
     *
     * @return bool false bila pembayaran ini sudah pernah dilunasi (no-op).
     */
    public function tandaiLunas(Payments $payment, array $dataTripay): bool
    {
        $sudahDiproses = false;

        DB::transaction(function () use ($payment, $dataTripay, &$sudahDiproses) {
            // Idempotency: kunci baris payment; pemicu kedua menunggu lalu melihat status paid.
            $payment = Payments::whereKey($payment->id)->lockForUpdate()->first();
            if ($payment->status === 'paid') {
                return;
            }

            // Update tabel payment
            $payment->update([
                'status' => 'paid',
                'fee_merchant' => $dataTripay['fee_merchant'] ?? $payment->fee_merchant,
                'fee_customer' => $dataTripay['fee_customer'] ?? $payment->fee_customer,
                'total_fee' => $dataTripay['total_fee'] ?? $payment->total_fee,
                'total_amount' => $dataTripay['total_amount'] ?? $payment->total_amount,
                'amount_recived' => $dataTripay['amount_received'] ?? $payment->amount_recived,
                'paid_at' => now(),
            ]);

            // Komisi afiliasi dicatat sebelum user dimutasi, supaya deteksi "member baru"
            // tidak terganggu status aktif yang baru saja ditulis di bawah.
            app(AffiliateCommissionService::class)->accrue($payment);

            $newsPackage = NewsPackage::find($payment->package_id);
            $user = User::whereKey($payment->user_id)->lockForUpdate()->first();

            // Hitung perpanjangan tanggal
            $baseDate = ($user->dateexp && Carbon::parse($user->dateexp)->isFuture())
                ? Carbon::parse($user->dateexp)
                : Carbon::now();

            switch ($newsPackage->jenis_periode) {
                case 'hari':
                    $baseDate->addDays($newsPackage->period);
                    break;
                case 'minggu':
                    $baseDate->addWeeks($newsPackage->period);
                    break;
                case 'tahun':
                    $baseDate->addYears($newsPackage->period);
                    break;
                case 'bulan':
                default:
                    $baseDate->addMonths($newsPackage->period);
                    break;
            }

            // Update kuota & data user
            // Hanya quota_news. Perilaku AJP yang sudah berjalan dipertahankan apa adanya:
            // feed_instagram, ekoran, dan wa_channel memang TIDAK pernah ditambah di sini.
            // Itu celah nyata (tombol add-on di News/Index.jsx membaca ketiga counter itu),
            // tapi memperbaikinya adalah keputusan tersendiri, bukan bagian pemindahan ini.
            $user->quota_news += $newsPackage->quota;
            $user->dateexp = $baseDate;
            $user->package_id = $newsPackage->id;
            $user->status = 1;
            $user->type = $newsPackage->type;
            $user->save();

            DB::afterCommit(function () use ($user, $payment, $newsPackage) {
                Mail::to($user->email)->send(new PaymentSuccessfulMail($payment, $user, $newsPackage));
            });

            $sudahDiproses = true;
        });

        return $sudahDiproses;
    }

    /**
     * Status selain lunas. Dipisah supaya pemanggil tidak perlu tahu bahwa status
     * `paid` tidak boleh ditimpa — itu aturan di sini, bukan di pemanggil.
     */
    public function tandaiBelumLunas(Payments $payment, string $status): void
    {
        // Jangan timpa status paid yang dicatat pemicu lain di antara cek awal dan update ini.
        Payments::whereKey($payment->id)
            ->where('status', '!=', 'paid')
            ->update(['status' => $status]);
    }

    /**
     * Terjemahkan status Tripay ke status lokal. Tripay memakai UNPAID dan REFUND,
     * kolom `payments.status` memakai pending dan refunded.
     */
    public function statusLokal(string $statusTripay): string
    {
        return match (strtolower($statusTripay)) {
            'unpaid' => 'pending',
            'refund' => 'refunded',
            default => strtolower($statusTripay),
        };
    }
}
