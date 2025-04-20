<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['name', 'email', 'password', 'birth_date', 'birth_place', 'gender', 'level', 'parent', 'cin', 'address','phone'];
}