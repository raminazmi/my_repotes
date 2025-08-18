<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Form extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type',
        'template',
        'settings',
        'is_active',
        'user_id',
        'is_template',
    ];

    protected $casts = [
        'settings' => 'array',
        'is_active' => 'boolean',
        'is_template' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function responses(): HasMany
    {
        return $this->hasMany(FormResponse::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class, 'form_id');
    }
}