<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [ 'description', 'amount', 'type', 'reference_number', 'entity_name', 'entity_type'];

    public function recorder() { return $this->belongsTo(User::class, 'recorded_by'); }
}