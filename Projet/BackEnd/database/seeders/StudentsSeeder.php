<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentsSeeder extends Seeder
{
    public function run()
    {
        $students = [
            [
                'name' => 'Ahmed Benali',
                'email' => 'ahmed.benali@student.com',
                'password' => Hash::make('123456789'),
                'birth_date' => '2010-03-15',
                'birth_place' => 'Casablanca',
                'gender' => 'Masculin',
                'class_id' => 1,
                'parent_name' => 'Mohamed Benali',
                'parent_cin' => 'P123456',
                'address' => '123 Rue Principale, Casablanca',
                'phone' => '0611223344',
                'decision' => 'progress',
                'is_deleted' => false
            ],
            [
                'name' => 'Fatima Zahra',
                'email' => 'fatima.zahra@student.com',
                'password' => Hash::make('123456789'),
                'birth_date' => '2011-07-22',
                'birth_place' => 'Rabat',
                'gender' => 'Féminin',
                'class_id' => 1,
                'parent_name' => 'Khadija Elamrani',
                'parent_cin' => 'P654321',
                'address' => '456 Avenue Secondaire, Rabat',
                'phone' => '0622334455',
                'decision' => 'progress',
                'is_deleted' => false
            ],
            [
                'name' => 'Youssef El Mansouri',
                'email' => 'youssef.mansouri@student.com',
                'password' => Hash::make('123456789'),
                'birth_date' => '2009-11-05',
                'birth_place' => 'Marrakech',
                'gender' => 'Masculin',
                'class_id' => 2,
                'parent_name' => 'Hassan El Mansouri',
                'parent_cin' => 'P789012',
                'address' => '789 Boulevard Tertiaire, Marrakech',
                'phone' => '0633445566',
                'decision' => 'progress',
                'is_deleted' => false
            ],
        ];

        DB::table('students')->insert($students);
    }
}