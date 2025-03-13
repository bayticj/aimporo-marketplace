<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SoftwarePlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'product_id',
        'name',
        'description',
        'price',
        'original_price',
        'pricing_model',
        'discount_percentage',
        'discount_valid_until',
        'duration_days',
        'features',
        'is_active',
        'display_order',
        'is_recommended',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'discount_valid_until' => 'datetime',
        'duration_days' => 'integer',
        'features' => 'array',
        'is_active' => 'boolean',
        'display_order' => 'integer',
        'is_recommended' => 'boolean',
    ];

    /**
     * Get the product that owns the plan.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(SoftwareProduct::class, 'product_id');
    }

    /**
     * Get the purchases for the plan.
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(SoftwarePurchase::class, 'plan_id');
    }

    /**
     * Check if the plan is a lifetime plan.
     *
     * @return bool
     */
    public function isLifetime(): bool
    {
        return is_null($this->duration_days) || $this->pricing_model === 'lifetime';
    }

    /**
     * Get the formatted price.
     *
     * @return string
     */
    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 2);
    }

    /**
     * Get the formatted duration.
     *
     * @return string
     */
    public function getFormattedDurationAttribute(): string
    {
        if ($this->isLifetime()) {
            return 'Lifetime';
        }

        if ($this->pricing_model === 'month') {
            return 'Monthly';
        }

        if ($this->pricing_model === 'year') {
            return 'Yearly';
        }

        if ($this->duration_days < 30) {
            return $this->duration_days . ' days';
        }

        $months = floor($this->duration_days / 30);
        return $months . ' ' . ($months === 1 ? 'month' : 'months');
    }

    /**
     * Calculate the discounted price.
     *
     * @return float
     */
    public function getDiscountedPriceAttribute(): float
    {
        if ($this->discount_percentage && $this->discount_valid_until && $this->discount_valid_until->isFuture()) {
            return $this->price * (1 - ($this->discount_percentage / 100));
        }

        return $this->price;
    }

    /**
     * Check if the plan has an active discount.
     *
     * @return bool
     */
    public function getHasActiveDiscountAttribute(): bool
    {
        return $this->discount_percentage && 
               $this->discount_valid_until && 
               $this->discount_valid_until->isFuture();
    }
}
