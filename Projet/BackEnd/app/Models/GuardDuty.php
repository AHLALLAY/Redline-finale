<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuardDuty extends Model
{
    protected $fillable = [ 'teacher_id',  'date' ];

    public function teacher(){ return $this->belongsTo(User::class, 'teacher_id'); }
}