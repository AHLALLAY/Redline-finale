<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    protected $fillable = ['niveau', 'group', 'teacher_id'];

    public function teacher() { return $this->belongsTo(User::class, 'teacher_id');}
    public function students() { return $this->hasMany(Student::class); }
    public function timeTables() { return $this->hasMany(TimeTable::class, 'level', 'niveau')->where('group', $this->group); }
}
