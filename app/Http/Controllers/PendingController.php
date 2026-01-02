<?php

namespace App\Http\Controllers;

use App\Models\NewsPackage;
use App\Services\TripayService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendingController extends Controller
{
    public function index(TripayService $tripayService)
    {
  
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        if (auth()->user()->status === 1) {
           return redirect()->route('dashboard');
        }

        $auth = auth()->user();

        $newsPackage = NewsPackage::find($auth->package_id);

        $paymentChannels = $tripayService->getPaymentChannel();

        return Inertia::render('Pending/Index', [
            'channel' => $paymentChannels,
            'newsPackage' => $newsPackage,
        ]);
    }
}
