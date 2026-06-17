<?php

namespace App\Http\Controllers;

use App\Models\NewsPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        $newsPackagesRegular = NewsPackage::where('type', '1')->where('level', 2)->where('kategori_produk', 'paket')->get();
        $newsPackagesSeasonal = NewsPackage::where('type', '1')->where('level', 3)->where('kategori_produk', 'paket')->get();
        $newsSatuan =  NewsPackage::where('type', '1')
            ->where('level', 2)
            ->where('status', 1)
            ->where('kategori_produk', 'satuan')
            ->get();
        $user = Auth::user();

        $userPackage = NewsPackage::find($user->package_id);


        return Inertia::render('Subscription/Index', [
            'newsPackagesRegular' => $newsPackagesRegular,
            'newsPackagesSeasonal' => $newsPackagesSeasonal,
            'newsSatuan' => $newsSatuan,
            'userPackage' => $userPackage,
        ]);
    }
}
