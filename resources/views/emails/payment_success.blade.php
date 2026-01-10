<!DOCTYPE html>
<html>
<head>
    <title>Invoice Pembayaran</title>
</head>
<body>
    <h2>Halo, {{ $user->nama }}!</h2>
    <p>Terima kasih telah melakukan pembayaran. Akun Anda sekarang telah aktif menjadi member <strong>{{ $user->type }}</strong>.</p>
    
    <table border="1" cellpadding="10" cellspacing="0">
        <tr>
            <td><strong>No. Referensi</strong></td>
            <td>{{ $payment->reference }}</td>
        </tr>
        <tr>
            <td><strong>Paket</strong></td>
            <td>{{ $newsPackage->name }}</td> 
        </tr>
        <tr>
            <td><strong>Jumlah Bayar</strong></td>
            <td>Rp {{ number_format($payment->amount, 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td><strong>Status</strong></td>
            <td>LUNAS</td>
        </tr>
        <tr>
            <td><strong>Masa Aktif Hingga</strong></td>
            <td>{{ \Carbon\Carbon::parse($user->dateexp)->format('d F Y') }}</td>
        </tr>
    </table>

    <p>Terima kasih telah berlangganan!</p>
</body>
</html>