<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['name', 'email', 'password', 'birth_date', 'birth_place', 'gender', 'level', 'goupe', 'parent', 'cin', 'address', 'phone'];

    public static function getLevelSlugs()
    {
        return [
            '1ere-annee' => '1ére année',
            '2eme-annee' => '2ème année',
            '3eme-annee' => '3ème année',
            '4eme-annee' => '4ème année',
            '5eme-annee' => '5ème année',
            '6eme-annee' => '6ème année',
        ];
    }
}
