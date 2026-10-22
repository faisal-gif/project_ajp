<?php

use App\Http\Controllers\AffiliateApplicationController;
use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PendingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TripayCallbackController;
use App\Http\Controllers\WartawanController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::get('/tentang', [WelcomeController::class, 'tentang'])->name('tentang');
Route::get('/convert-password/{id}', [WartawanController::class, 'convert_pswd'])->name('convert');
Route::get('/harga', [WelcomeController::class, 'harga'])->name('harga');
Route::get('/kebijakan-privasi', function () {
    return Inertia::render('KebijakanPrivasi/Index')->withViewData('meta', ['title' => 'Kebijakan Privasi']);
})->name('kebijakan-privasi');
Route::get('/syarat-ketentuan', function () {
    return Inertia::render('SyaratKetentuan/Index')->withViewData('meta', ['title' => 'Syarat & Ketentuan']);
})->name('syarat-ketentuan');




Route::get('/checkout', [PendingController::class, 'index'])->middleware('auth')->name('checkout');
Route::post('/checkout/payment', [PaymentController::class, 'store'])->middleware('auth')->name('checkout.payment');

/*
 * Halaman pembayaran sendiri — pengganti halaman checkout milik Tripay.
 * Di luar middleware 'active' karena justru dipakai user yang belum aktif.
 * Dicari lewat merchant_ref (ULID) dan dibatasi pemiliknya di controller.
 */
Route::middleware('auth')->group(function () {
    Route::get('/pembayaran/{merchantRef}', [PaymentController::class, 'instruksi'])->name('pembayaran.instruksi');
    // Dibatasi karena halamannya ikut memanggil otomatis selama terbuka.
    Route::post('/pembayaran/{merchantRef}/cek', [PaymentController::class, 'cekStatus'])
        ->middleware('throttle:20,1')
        ->name('pembayaran.cek');
    Route::post('/pembayaran/{merchantRef}/ulang', [PaymentController::class, 'buatUlang'])
        ->middleware('throttle:10,1')
        ->name('pembayaran.ulang');
});


Route::middleware(['auth', 'active'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('news', NewsController::class);
    Route::post('/news/{news}/request-addon', [NewsController::class, 'requestAddon'])->name('news.request-addon');
    Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/avatar', [ProfileController::class, 'uploadAvatar'])->name('upload.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});


Route::post('/tripay/callback', [TripayCallbackController::class, 'handle'])->name('tripay.callback');

Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');

Route::get('/syarat-afiliasi', fn () => Inertia::render('Afiliasi/SyaratKetentuan', [
    'min_payout' => (int) config('affiliate.min_payout'),
    'hold_days' => (int) config('affiliate.hold_days'),
    'cookie_days' => (int) config('affiliate.cookie_days'),
    // Tarif yang boleh dilihat publik. Pos internal sengaja tidak ikut dikirim.
    'tier1_bps' => (int) config('affiliate.tier1_bps'),
    'tier2_bps' => (int) config('affiliate.tier2_bps'),
]))->name('afiliasi.syarat');

Route::get('/panduan-afiliasi', fn () => Inertia::render('Afiliasi/Panduan', [
    'min_payout' => (int) config('affiliate.min_payout'),
    'hold_days' => (int) config('affiliate.hold_days'),
    'cookie_days' => (int) config('affiliate.cookie_days'),
    // Tarif yang boleh dilihat publik. Pos internal sengaja tidak ikut dikirim.
    'tier1_bps' => (int) config('affiliate.tier1_bps'),
    'tier2_bps' => (int) config('affiliate.tier2_bps'),
]))->name('afiliasi.panduan');

Route::middleware('auth')->group(function () {
    // Tanpa middleware 'active': afiliator bentukan admin belum tentu member berbayar.
    Route::get('/afiliasi', [AffiliateController::class, 'index'])->name('afiliasi.index');

    // Pengajuan jadi afiliator hanya untuk member aktif.
    Route::middleware('active')->group(function () {
        Route::get('/afiliasi/daftar', [AffiliateApplicationController::class, 'create'])->name('afiliasi.daftar');
        Route::post('/afiliasi/daftar', [AffiliateApplicationController::class, 'store']);
    });
});

require __DIR__ . '/auth.php';
