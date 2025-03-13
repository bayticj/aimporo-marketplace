<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class DigitalProduct extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'short_description',
        'price',
        'original_price',
        'pricing_model',
        'discount_percentage',
        'discount_valid_until',
        'file_path',
        'file_name',
        'file_size',
        'file_type',
        'preview_path',
        'download_limit',
        'is_featured',
        'status',
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
        'is_featured' => 'boolean',
    ];

    /**
     * Get the user that owns the digital product.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the categories for the digital product.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(DigitalProductCategory::class, 'digital_product_category', 'digital_product_id', 'digital_product_category_id');
    }

    /**
     * Get the purchases for the digital product.
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(DigitalProductPurchase::class);
    }

    /**
     * Get the pricing plans for the digital product.
     */
    public function pricingPlans(): MorphMany
    {
        return $this->morphMany(PricingPlan::class, 'priceable');
    }

    /**
     * Scope a query to only include published digital products.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope a query to only include featured digital products.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Get the full file path.
     */
    public function getFullFilePathAttribute(): string
    {
        return storage_path('app/' . $this->file_path);
    }

    /**
     * Get the full preview path.
     */
    public function getFullPreviewPathAttribute(): ?string
    {
        return $this->preview_path ? storage_path('app/' . $this->preview_path) : null;
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
     * Check if the product has an active discount.
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