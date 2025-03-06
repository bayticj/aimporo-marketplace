<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dispute extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'order_id',
        'user_id',
        'status',
        'type',
        'title',
        'description',
        'resolution_notes',
        'resolved_by',
        'resolved_at',
        'refund_amount',
        'is_escalated',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'resolved_at' => 'datetime',
        'refund_amount' => 'decimal:2',
        'is_escalated' => 'boolean',
    ];

    /**
     * Get the order associated with the dispute.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the user who opened the dispute.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the admin who resolved the dispute.
     */
    public function resolver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }

    /**
     * Get the evidence for the dispute.
     */
    public function evidence(): HasMany
    {
        return $this->hasMany(DisputeEvidence::class);
    }

    /**
     * Get the comments for the dispute.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(DisputeComment::class)->orderBy('created_at', 'asc');
    }

    /**
     * Scope a query to only include open disputes.
     */
    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }

    /**
     * Scope a query to only include under review disputes.
     */
    public function scopeUnderReview($query)
    {
        return $query->where('status', 'under_review');
    }

    /**
     * Scope a query to only include resolved disputes.
     */
    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    /**
     * Scope a query to only include closed disputes.
     */
    public function scopeClosed($query)
    {
        return $query->where('status', 'closed');
    }

    /**
     * Scope a query to only include escalated disputes.
     */
    public function scopeEscalated($query)
    {
        return $query->where('is_escalated', true);
    }
} 