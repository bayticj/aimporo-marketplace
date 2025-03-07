<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Partner extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'company_name',
        'email',
        'api_key',
        'webhook_url',
        'integration_type',
        'api_endpoint',
        'redemption_url',
    ];

    /**
     * Get the products for the partner.
     */
    public function products(): HasMany
    {
        return $this->hasMany(SoftwareProduct::class);
    }

    /**
     * Generate a unique API key for the partner.
     *
     * @return string
     */
    public static function generateApiKey(): string
    {
        $apiKey = Str::random(64);
        
        // Ensure the API key is unique
        while (self::where('api_key', $apiKey)->exists()) {
            $apiKey = Str::random(64);
        }
        
        return $apiKey;
    }
}
