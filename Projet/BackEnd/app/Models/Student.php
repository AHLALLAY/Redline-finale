<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['name', 'email', 'password', 'birth_date', 'birth_place', 'gender', 'level', 'group', 'parent', 'cin', 'address', 'phone'];

    public static function getLevelSlugs($level)
    {
        switch ($level) {
            case '1ére année':
                return 'fst_year';
                break;
            case '2ème année':
                return 'scd_year';
                break;
            case '3ème année':
                return 'trd_year';
                break;
            case '4ème année':
                return 'frh_year';
                break;
            case '5ème année':
                return 'fth_year';
                break;
            case '6ème année':
                return 'sxh_year';
                break;
            default:
                return 'invalide';
                break;
        }
    }
}
