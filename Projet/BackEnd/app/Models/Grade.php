<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{

    protected $fillable = ['student_id', 'grade', 'evaluation_number', 'teacher_id','subject_id'];
    protected $casts = ['grade' => 'float','graded_at' => 'datetime'];

    public function student(){ return $this->belongsTo(Student::class); }
    public function teacher(){ return $this->belongsTo(User::class, 'teacher_id'); }
    public function subject(){ return $this->belongsTo(Subject::class); }
}