<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsPackage;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $newsFirstPackage = NewsPackage::where('type', '1')->where('level', 1)->get();
        $countuser = User::where('type', '1')->count();
        $countArticle = News::where('type', '1')->count();

        return Inertia::render('Welcome/Index', [
            'newsFirstPackage' => $newsFirstPackage,
            'countuser' => $countuser,
            'countArticle' => $countArticle,
        ])->withViewData('meta', [
            'title' => 'Terbitkan kabar instansi di TIMES Indonesia',
            'description' => 'Kirim naskah lewat AJP. Redaksi TIMES Indonesia menyunting dan menerbitkannya, lalu menyebarkannya ke e-koran, Instagram, dan WA Channel sesuai paket.',
        ]);
    }

    public function tentang()
    {
        $countuser = User::where('type', '1')->count();
        $countArticle = News::where('type', '1')->count();

        return Inertia::render('Tentang/Index', [
            'countuser' => $countuser,
            'countArticle' => $countArticle,
        ])->withViewData('meta', [
            'title' => 'Tentang',
            'description' => 'AJP (Aplikasi Jurnalisme Positif) adalah platform jurnalistik bersama redaksi TIMES Indonesia yang mendorong pemberitaan berimbang, solutif, dan inspiratif.',
        ]);
    }

    public function harga()
    {
        $newsFirstPackage = NewsPackage::where('type', '1')->where('level', 1)->get();

        return Inertia::render('Harga/Index', [
            'newsFirstPackage' => $newsFirstPackage
        ])->withViewData('meta', [
            'title' => 'Harga paket',
            'description' => 'Pilih paket publikasi AJP: terbit di TIMES Indonesia, dibimbing dan disunting redaksi, dengan kuota opini, e-koran, feed Instagram, dan WA Channel.',
        ]);
    }
}
