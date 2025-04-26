<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    protected $fillable = ['niveau', 'group', 'teacher'];

    public function teacher(){ return $this->belongsToMany(User::class); }
}
