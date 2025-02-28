<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'gig_id',
        'requirements',
        'price',
        'delivery_time',
        'status',
        'delivery_message',
        'cancellation_reason',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'delivery_time' => 'integer',
        'delivered_at' => 'datetime',
        'completed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    /**
     * Get the user (buyer) that owns the order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the gig that the order belongs to.
     */
    public function gig()
    {
        return $this->belongsTo(Gig::class);
    }

    /**
     * Get the review associated with the order.
     */
    public function review()
    {
        return $this->hasOne(Review::class);
    }
} 