<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DigitalProductPurchase extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'digital_product_id',
        'transaction_id',
        'amount',
        'payment_method',
        'payment_status',
        'download_count',
        'last_downloaded_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'download_count' => 'integer',
        'last_downloaded_at' => 'datetime',
    ];

    /**
     * Get the user that owns the purchase.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the digital product that was purchased.
     */
    public function digitalProduct(): BelongsTo
    {
        return $this->belongsTo(DigitalProduct::class);
    }

    /**
     * Check if the purchase has reached its download limit.
     */
    public function hasReachedDownloadLimit(): bool
    {
        $limit = $this->digitalProduct->download_limit;
        
        // If there's no limit, return false
        if (!$limit) {
            return false;
        }
        
        return $this->download_count >= $limit;
    }

    /**
     * Increment the download count.
     */
    public function incrementDownloadCount(): void
    {
        $this->increment('download_count');
        $this->update(['last_downloaded_at' => now()]);
    }
} 