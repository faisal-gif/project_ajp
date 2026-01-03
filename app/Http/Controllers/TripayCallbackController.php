<?php

namespace App\Http\Controllers;

use App\Models\NewsPackage;
use App\Models\Payments;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TripayCallbackController extends Controller
{
    public function handle(Request $request)
    {
        $signature = hash_hmac(
            'sha256',
            $request->getContent(),
            config('tripay.private_key')
        );

        abort_if(
            $signature !== $request->header('X-Tripay-Signature'),
            403
        );

        $data = $request->data;

        $payment = Payments::where('reference', $data['reference'])->firstOrFail();

        if ($data['status'] === 'PAID') {
            DB::transaction(function () use ($payment, $data) {
                $payment->update([
                    'status' => 'paid',
                    'paid_at' => now(),
                    'payload' => $data,
                ]);


                $newsPackage = NewsPackage::find($payment->package_id);

                $user = User::find($payment->user_id);
                $user->quota_news += $newsPackage->quota;
                if ($user->dateexp == null) {
                    $user->dateexp = now()->addMonth($newsPackage->perioid);
                } else {
                    $user->dateexp = $user->dateexp->addMonth($newsPackage->perioid);
                }
                $user->package_id = $newsPackage->id;
                $user->type = $newsPackage->type;
                $user->save();
            });
        }

        return response()->json(['success' => true]);
    }
}
