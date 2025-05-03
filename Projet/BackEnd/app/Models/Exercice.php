<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercice extends Model
{
    protected $fillable = ['title','description','teacher_id','class_id','is_done','done_at'];

    public function teacher(){ return $this->belongsTo(User::class, 'teacher_id'); }
    public function classe(){ return $this->belongsTo(Classe::class, 'class_id'); }
}