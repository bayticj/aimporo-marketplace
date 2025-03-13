<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class PricingPlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'price',
        'original_price',
        'pricing_model',
        'discount_percentage',
        'discount_valid_until',
        'delivery_time',
        'revisions',
        'features',
        'display_order',
        'is_recommended',
        'is_active',
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
        'features' => 'array',
        'is_recommended' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Get the parent priceable model (gig or digital product).
     */
    public function priceable(): MorphTo
    {
        return $this->morphTo();
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
