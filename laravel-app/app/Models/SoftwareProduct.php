<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class SoftwareProduct extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'partner_id',
        'name',
        'slug',
        'description',
        'version',
        'logo_path',
        'screenshots',
        'short_description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'screenshots' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get the partner that owns the product.
     */
    public function partner(): BelongsTo
    {
        return $this->belongsTo(Partner::class);
    }

    /**
     * Get the plans for the product.
     */
    public function plans(): HasMany
    {
        return $this->hasMany(SoftwarePlan::class, 'product_id');
    }

    /**
     * Get the purchases for the product.
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(SoftwarePurchase::class, 'product_id');
    }

    /**
     * Generate a slug from the product name.
     *
     * @param string $name
     * @return string
     */
    public static function generateSlug(string $name): string
    {
        $slug = Str::slug($name);
        $count = 1;
        
        // Ensure the slug is unique
        while (self::where('slug', $slug)->exists()) {
            $slug = Str::slug($name) . '-' . $count;
            $count++;
        }
        
        return $slug;
    }
}
