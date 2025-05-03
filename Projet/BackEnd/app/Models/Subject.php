<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [ 'name', 'code', 'description', 'weekly_hours', 'category', 'teaching_level', 'is_active' ];


    public function teachers() { return $this->hasMany(User::class, 'subject_id'); }
}