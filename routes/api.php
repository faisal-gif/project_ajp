<?php

use App\Http\Controllers\NewsController;
use Illuminate\Support\Facades\Route;

Route::get('/news/show/{id}', [NewsController::class, 'apiShow'])->name('news.api.show');
