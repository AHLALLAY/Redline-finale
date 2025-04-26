<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class TextBox extends Model
{
    protected $fillable = ['title', 'type', 'description', 'teacher'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
