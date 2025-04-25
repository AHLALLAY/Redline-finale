<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercice extends Model
{
    protected $fillable = ['title','description','classe','group','teacher_id','is_done','done_at'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
