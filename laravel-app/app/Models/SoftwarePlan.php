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
        'duration_days',
        'features',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'duration_days' => 'integer',
        'features' => 'array',
        'is_active' => 'boolean',
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
        return is_null($this->duration_days);
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

        if ($this->duration_days < 30) {
            return $this->duration_days . ' days';
        }

        $months = floor($this->duration_days / 30);
        return $months . ' ' . ($months === 1 ? 'month' : 'months');
    }
}
