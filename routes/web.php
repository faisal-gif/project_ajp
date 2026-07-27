<?php

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
    return Inertia::render('KebijakanPrivasi/Index');
})->name('kebijakan-privasi');
Route::get('/syarat-ketentuan', function () {
    return Inertia::render('SyaratKetentuan/Index');
})->name('syarat-ketentuan');




Route::get('/checkout', [PendingController::class, 'index'])->middleware('auth')->name('checkout');
Route::post('/checkout/payment', [PaymentController::class, 'store'])->middleware('auth')->name('checkout.payment');


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

require __DIR__ . '/auth.php';
