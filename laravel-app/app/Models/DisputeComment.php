<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DisputeComment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'dispute_id',
        'user_id',
        'comment',
        'is_admin_comment',
        'is_system_comment',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_admin_comment' => 'boolean',
        'is_system_comment' => 'boolean',
    ];

    /**
     * Get the dispute that owns the comment.
     */
    public function dispute(): BelongsTo
    {
        return $this->belongsTo(Dispute::class);
    }

    /**
     * Get the user who added the comment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include admin comments.
     */
    public function scopeAdminComments($query)
    {
        return $query->where('is_admin_comment', true);
    }

    /**
     * Scope a query to only include system comments.
     */
    public function scopeSystemComments($query)
    {
        return $query->where('is_system_comment', true);
    }

    /**
     * Scope a query to only include user comments.
     */
    public function scopeUserComments($query)
    {
        return $query->where('is_admin_comment', false)
                     ->where('is_system_comment', false);
    }
} 