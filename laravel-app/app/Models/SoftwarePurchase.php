<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class SoftwarePurchase extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'product_id',
        'plan_id',
        'status',
        'redemption_code',
        'redemption_url',
        'external_account_id',
        'external_username',
        'external_password',
        'purchased_at',
        'redeemed_at',
        'expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'purchased_at' => 'datetime',
        'redeemed_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    /**
     * Get the user that owns the purchase.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product that was purchased.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(SoftwareProduct::class, 'product_id');
    }

    /**
     * Get the plan that was purchased.
     */
    public function plan(): BelongsTo
    {
        return $this->belongsTo(SoftwarePlan::class, 'plan_id');
    }

    /**
     * Generate a redemption code for the purchase.
     *
     * @return string
     */
    public function generateRedemptionCode(): string
    {
        $prefix = strtoupper(substr(str_replace(' ', '', $this->product->name), 0, 3));
        $uniqueId = strtoupper(substr(md5($this->id . $this->user_id . time()), 0, 8));
        
        $redemptionCode = $prefix . '-' . $uniqueId;
        
        // Update the purchase with the redemption code
        $this->update(['redemption_code' => $redemptionCode]);
        
        return $redemptionCode;
    }

    /**
     * Check if the purchase is active.
     *
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->status === 'active' || $this->status === 'redeemed';
    }

    /**
     * Check if the purchase has expired.
     *
     * @return bool
     */
    public function hasExpired(): bool
    {
        if ($this->plan->isLifetime()) {
            return false;
        }
        
        return $this->expires_at && $this->expires_at->isPast();
    }

    /**
     * Mark the purchase as redeemed.
     *
     * @param string|null $externalAccountId
     * @param string|null $externalUsername
     * @param string|null $externalPassword
     * @return bool
     */
    public function markAsRedeemed(?string $externalAccountId = null, ?string $externalUsername = null, ?string $externalPassword = null): bool
    {
        $data = [
            'status' => 'redeemed',
            'redeemed_at' => now(),
        ];
        
        if ($externalAccountId) {
            $data['external_account_id'] = $externalAccountId;
        }
        
        if ($externalUsername) {
            $data['external_username'] = $externalUsername;
        }
        
        if ($externalPassword) {
            $data['external_password'] = $externalPassword;
        }
        
        return $this->update($data);
    }

    /**
     * Calculate and set the expiration date based on the plan duration.
     *
     * @return bool
     */
    public function setExpirationDate(): bool
    {
        if ($this->plan->isLifetime()) {
            return $this->update(['expires_at' => null]);
        }
        
        $expiresAt = now()->addDays($this->plan->duration_days);
        return $this->update(['expires_at' => $expiresAt]);
    }
}
