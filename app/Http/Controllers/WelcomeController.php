<?php

namespace App\Http\Controllers;

use App\Models\NewsPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $newsPackagesReguler = NewsPackage::where('type', '1')->where('level', 1)->get();
        $newsPackagesSeasonal = NewsPackage::where('type', '1')->where('level', 2)->get();

        return Inertia::render('Welcome/Index', [
            'newsPackagesReguler' => $newsPackagesReguler,
            'newsPackagesSeasonal' => $newsPackagesSeasonal,
        ]);
    }
    public function harga()
    {
        $newsPackages = NewsPackage::where('type', '1')->get();

        return Inertia::render('Harga/Index', [
            'newsPackages' => $newsPackages,
        ]);
    }
}
