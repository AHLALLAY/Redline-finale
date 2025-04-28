<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeTable extends Model
{
    protected $fillable = ['level', 'group', 'class_room_N', 'start_time', 'end_time', 'subject_school'];
    
}
