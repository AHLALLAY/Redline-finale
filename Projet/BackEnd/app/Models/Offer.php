<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{

    protected $fillable = ['title', 'description', 'contract_type','is_active','created_by'];

    public function creator(){ return $this->belongsTo(User::class, 'created_by'); }
}