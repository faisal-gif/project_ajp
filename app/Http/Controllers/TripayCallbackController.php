<?php

namespace App\Http\Controllers;

use App\Mail\PaymentSuccessfulMail;
use App\Models\NewsPackage;
use App\Models\Payments;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class TripayCallbackController extends Controller
{
    public function handle(Request $request)
    {
        $signature = hash_hmac(
            'sha256',
            $request->getContent(),
            config('services.tripay.private_key')
        );

        abort_if(
            $signature !== $request->header('X-Callback-Signature'),
            403
        );

        $data = $request->all();

        $payment = Payments::where('reference', $request->reference)->firstOrFail();

        if ($data['status'] === 'PAID') {
            DB::transaction(function () use ($payment, $data) {
                $payment->update([
                    'status' => 'paid',
                    'paid_at' => now(),

                ]);


                $newsPackage = NewsPackage::find($payment->package_id);

                $user = User::find($payment->user_id);


                $baseDate = $user->dateexp ? Carbon::parse($user->dateexp) : now();

                switch ($newsPackage->jenis_periode) {
                    case 'hari':
                        $baseDate->addDays($newsPackage->period);
                        break;
                    case 'minggu':
                        $baseDate->addWeeks($newsPackage->period);
                        break;
                    case 'tahun':
                        $baseDate->addYears($newsPackage->period);
                        break;
                    case 'bulan':
                    default:
                        $baseDate->addMonths($newsPackage->period);
                        break;
                }

                $user->quota_news += $newsPackage->quota;
                $user->dateexp = $baseDate;
                $user->package_id = $newsPackage->id;
                $user->status = 1;
                $user->type = $newsPackage->type;
                $user->save();

                DB::afterCommit(function () use ($user, $payment, $newsPackage) {
                    Mail::to($user->email)->send(new PaymentSuccessfulMail($payment, $user, $newsPackage));
                });
            });
        }



        return response()->json(['success' => true]);
    }
}
