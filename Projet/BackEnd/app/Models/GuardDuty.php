<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GuardDuty extends Model
{
    use HasFactory;

    protected $table = 'guardDuties';
    protected $fillable = [ 'teacher_id',  'date' ];

    public function teacher(){ return $this->belongsTo(User::class, 'teacher_id'); }
}