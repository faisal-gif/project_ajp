<?php

namespace App\Http\Controllers;

use App\Models\NewsPackage;
use App\Services\TripayService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendingController extends Controller
{
    public function index(TripayService $tripayService, Request $request)
    {

        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $auth = auth()->user();

        // Dibatasi ke paket AJP yang aktif, dan dijaga dari id ngawur. Tanpa ini
        // /checkout?package_id=<paket Kopi TIMES> bisa dibuka dari sini — satu
        // database dipakai bersama — dan id yang tidak ada membuat halaman crash.
        $packageId = $request->package_id ?: $auth->package_id;
        $newsPackage = NewsPackage::where('type', '1')
            ->where('status', 1)
            ->find($packageId);

        if (! $newsPackage) {
            return redirect()->route('subscription.index');
        }

        $paymentChannels = $tripayService->getPaymentChannel();

        return Inertia::render('Pending/Index', [
            'channel' => $paymentChannels,
            'newsPackage' => $newsPackage,
        ]);
    }
}
