<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [ 'description', 'amount', 'type', 'reference_number', 'entity_name', 'entity_type', 'recorded_by' ];

    public function recorder() { return $this->belongsTo(User::class, 'recorded_by'); }
}