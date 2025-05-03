<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [ 'name', 'code', 'description', 'weekly_hours', 'category', 'teaching_level' ];

    public function teachers() { return $this->hasMany(User::class, 'subject_id'); }
}