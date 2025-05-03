<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    
    protected $fillable = [ 'name', 'cin', 'email', 'password', 'role', 'birth_date', 'phone', 'last_diploma', 'obtained_at', 'subject_id', 'teaching_level',  'is_suspended', 'is_deleted' ];
    protected $hidden = [ 'password', 'remember_token', ];

    protected function casts(): array 
    { 
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_suspended' => 'boolean',
            'is_deleted' => 'boolean',
        ]; 
    }

    // Méthode de l'interface JWTSubject
    public function getJWTIdentifier() { return $this->getKey(); }
    public function getJWTCustomClaims() { return []; }

    // les relation avec les autres models
    public function exercices() { return $this->hasMany(Exercice::class, 'teacher_id'); }
    public function guardDuties() { return $this->hasMany(GuardDuty::class, 'teacher_id'); }
    public function textBoxes() { return $this->hasMany(TextBox::class, 'teacher_id'); }
    public function grades() { return $this->hasMany(Grade::class, 'teacher_id'); }
    public function classes() { return $this->hasMany(Classe::class, 'teacher_id'); }
    public function subject() {return $this->belongsTo(Subject::class);}
    public function transactions() { return $this->hasMany(Transaction::class, 'recorded_by'); }
    public function recordedAbsences() { return $this->hasMany(Absence::class, 'recorded_by'); }
    public function offers() { return $this->hasMany(Offer::class, 'created_by'); }
}