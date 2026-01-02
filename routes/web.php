<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PendingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TripayCallbackController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::get('/tentang', function () {
    return Inertia::render('Tentang/Index');
})->name('tentang');
Route::get('/harga', [WelcomeController::class, 'harga'])->name('harga');



Route::get('/account-pending', [PendingController::class, 'index'])->middleware('auth')->name('account.pending');
Route::post('/account-pending/payment', [PaymentController::class, 'store'])->middleware('auth')->name('account.pending.payment');


Route::middleware(['auth', 'active'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('news', NewsController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::post('/tripay/callback', [TripayCallbackController::class, 'handle']);

Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');

require __DIR__ . '/auth.php';
