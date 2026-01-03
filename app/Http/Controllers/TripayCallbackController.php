<?php

namespace App\Http\Controllers;

use App\Models\NewsPackage;
use App\Models\Payments;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TripayCallbackController extends Controller
{
    public function handle(Request $request)
    {
        \Log::info('Tripay callback MASUK', [
            'headers' => $request->headers->all(),
            'body' => $request->all(),
        ]);

        return response()->json(['success' => true]);
    }
}
