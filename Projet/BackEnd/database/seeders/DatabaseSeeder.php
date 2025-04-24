<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UsersSeeder::class,
            StudentsSeeder::class,
            AbsencesSeeder::class,
            JournalsSeeder::class,
            ExercicesSeeder::class,
        ]);
    }
}