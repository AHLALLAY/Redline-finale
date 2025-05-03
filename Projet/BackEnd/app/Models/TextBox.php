<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TextBox extends Model
{
    protected $fillable = ['title', 'type', 'description', 'teacher_id','class_id'];

    public function teacher(){ return $this->belongsTo(User::class, 'teacher_id'); }
    public function classe(){ return $this->belongsTo(Classe::class, 'class_id'); }
}