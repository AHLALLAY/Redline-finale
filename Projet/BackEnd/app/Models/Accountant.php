<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accountant extends Model
{
    protected $table = 'journals';
    protected $fillable = ['label', 'amount', 'type', 'reference', 'ressource', 'ressource_type'];
}
