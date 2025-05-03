<?php
// app/Models/Student.php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Student extends Authenticatable implements JWTSubject
{
    protected $fillable = [ 'name', 'email', 'password', 'birth_date', 'birth_place', 'gender', 'class_id', 'parent_name', 'parent_cin',  'address', 'phone', 'decision', 'is_deleted' ];

    protected $hidden = ['password',];

    public function getJWTIdentifier() { return $this->getKey(); }
    public function getJWTCustomClaims() { return []; }
    public function absences() { return $this->hasMany(Absence::class); }
    public function grades() { return $this->hasMany(Grade::class); }
    public function classe() { return $this->belongsTo(Classe::class, 'class_id'); }
}