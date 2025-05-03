<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            SubjectsSeeder::class,
            UsersSeeder::class,
            ClassesSeeder::class,
            StudentsSeeder::class,
            AbsencesSeeder::class,
            TransactionsSeeder::class,
            ExercicesSeeder::class,
        ]);
    }
}