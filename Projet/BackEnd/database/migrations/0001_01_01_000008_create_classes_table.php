<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->enum('level', ['1ére année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année']);
            $table->enum('group', ['A', 'B', 'C', 'D']);
            $table->foreignId('teacher_id')->constrained('users')->onDelete('restrict');
            $table->integer('room_number');
            $table->integer('academic_year');
            $table->timestamps();
            $table->unique(['level', 'group', 'academic_year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
