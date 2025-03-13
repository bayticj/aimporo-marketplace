<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Laravel\Scout\Searchable;

class Gig extends Model
{
    use HasFactory, Searchable;
    
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
        'category_id',
        'subcategory',
        'price',
        'original_price',
        'pricing_model',
        'discount_percentage',
        'discount_valid_until',
        'delivery_time',
        'requirements',
        'location',
        'is_featured',
        'is_active',
        'is_digital_product',
        'is_service',
        'thumbnail',
        'images',
        'tags',
        'average_rating',
        'rating',
        'reviews_count',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'images' => 'array',
        'tags' => 'array',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'discount_valid_until' => 'datetime',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'is_digital_product' => 'boolean',
        'is_service' => 'boolean',
        'average_rating' => 'decimal:1',
        'rating' => 'integer',
        'reviews_count' => 'integer',
    ];
    
    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = $this->toArray();
        
        // Customize the data array...
        $array = [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'category_id' => $this->category_id,
            'subcategory' => $this->subcategory,
            'price' => $this->price,
            'pricing_model' => $this->pricing_model,
            'delivery_time' => $this->delivery_time,
            'location' => $this->location,
            'tags' => $this->tags,
            'user_id' => $this->user_id,
            'rating' => $this->rating,
            'is_featured' => $this->is_featured,
            'is_active' => $this->is_active,
            'is_digital_product' => $this->is_digital_product,
            'is_service' => $this->is_service,
            'created_at' => $this->created_at,
        ];
        
        return $array;
    }
    
    /**
     * Get the user that owns the gig.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the orders for the gig.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
    
    /**
     * Get the reviews for the gig.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
    
    /**
     * Get the category that the gig belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    /**
     * Get the pricing plans for the gig.
     */
    public function pricingPlans(): MorphMany
    {
        return $this->morphMany(PricingPlan::class, 'priceable');
    }
    
    /**
     * Scope a query to only include active gigs.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
    
    /**
     * Scope a query to only include featured gigs.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
    
    /**
     * Scope a query to filter by category.
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }
    
    /**
     * Scope a query to filter by subcategory.
     */
    public function scopeBySubcategory($query, $subcategory)
    {
        return $query->where('subcategory', $subcategory);
    }
    
    /**
     * Scope a query to filter by minimum rating.
     */
    public function scopeByMinRating($query, $rating)
    {
        return $query->where('average_rating', '>=', $rating);
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
     * Check if the gig has an active discount.
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
