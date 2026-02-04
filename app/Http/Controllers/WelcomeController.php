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
        $newsPackagesReguler = NewsPackage::where('type', '1')->where('level', 1)->get();
        $newsPackagesSeasonal = NewsPackage::where('type', '1')->where('level', 2)->get();
        $countuser = User::where('type', '1')->count();
        $countArticle = News::where('type', '1')->count();

        return Inertia::render('Welcome/Index', [
            'newsPackagesReguler' => $newsPackagesReguler,
            'newsPackagesSeasonal' => $newsPackagesSeasonal,
            'countuser' => $countuser,
            'countArticle' => $countArticle,
        ]);
    }

    public function tentang()
    {
        $countuser = User::where('type', '1')->count();
        $countArticle = News::where('type', '1')->count();

        return Inertia::render('Tentang/Index', [
            'countuser' => $countuser,
            'countArticle' => $countArticle,
        ]);
    }

    public function harga()
    {
        $newsPackagesReguler = NewsPackage::where('type', '1')->where('level', 1)->get();
        $newsPackagesSeasonal = NewsPackage::where('type', '1')->where('level', 2)->get();

        return Inertia::render('Harga/Index', [
            'newsPackagesReguler' => $newsPackagesReguler,
            'newsPackagesSeasonal' => $newsPackagesSeasonal,
        ]);
    }
}
