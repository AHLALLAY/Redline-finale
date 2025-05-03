<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeTable extends Model
{
    protected $fillable = ['class_id','teacher_id','day_of_week','start_time', 'end_time',];

    public function classe(){ return $this->belongsTo(Classe::class, 'class_id'); }
    public function teacher(){ return $this->belongsTo(User::class, 'teacher_id'); }
}