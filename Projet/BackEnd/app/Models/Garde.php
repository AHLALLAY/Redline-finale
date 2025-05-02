<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Garde extends Model
{
    protected $fillable = ['teacher_id', 'date','start_time'];

    public function teacher() { return $this->belongsTo(User::class, 'teacher_id'); }
    
}
