<?php

namespace App\Mail;

use App\Models\Payments;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentSuccessfulMail extends Mailable
{
    use Queueable, SerializesModels;

    public $payment;
    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct(Payments $payment, User $user)
    {
        $this->payment = $payment;
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('Pembayaran Berhasil - Invoice #' . $this->payment->reference)
            ->view('emails.payment_success');
    }
}
