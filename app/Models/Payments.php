<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    protected $guarded = [];

    protected $casts = [
        'paid_at' => 'datetime',
        'expired_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function newsPackage()
    {
        return $this->belongsTo(NewsPackage::class, 'package_id');
    }

    public function commissions()
    {
        return $this->hasMany(AffiliateCommission::class, 'payment_id');
    }

    public function scopeOwnedBy($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
