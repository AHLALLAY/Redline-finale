<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    
    protected $fillable = [ 'level', 'group',  'teacher_id', 'room_number', 'academic_year' ];

    public function teacher() {return $this->belongsTo(User::class, 'teacher_id');}
    public function students() { return $this->hasMany(Student::class, 'class_id'); }
    public function timeTables() { return $this->hasMany(TimeTable::class, 'class_id');}
    public function exercices(){return $this->hasMany(Exercice::class, 'class_id');}
    public function textBoxes(){return $this->hasMany(TextBox::class, 'class_id');}
}