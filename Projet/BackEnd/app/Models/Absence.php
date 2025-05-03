<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    protected $fillable = ['student_id', 'status', 'delay', 'date', 'period', 'justification', 'recorded_by'];

    public function student(){ return $this->belongsTo(Student::class); }
    public function recordedBy(){ return $this->belongsTo(User::class, 'recorded_by'); }
}