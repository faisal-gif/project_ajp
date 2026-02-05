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
        $newsPackagesRegular = NewsPackage::where('type', '1')->where('level', 2)->get();
        $newsPackagesSeasonal = NewsPackage::where('type', '1')->where('level', 3)->get();
        $user = Auth::user();

        $userPackage = NewsPackage::find($user->package_id);


        return Inertia::render('Subscription/Index', [
            'newsPackagesRegular' => $newsPackagesRegular,
            'newsPackagesSeasonal' => $newsPackagesSeasonal,
            'userPackage' => $userPackage,
        ]);
    }
}
