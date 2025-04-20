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
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->enum('status', ['Présent', 'Absent', 'Retard'])->default('Présent');
            $table->integer('delay')->nullable();
            $table->date('date');
            $table->enum('period', ['Matin', 'Après-midi', 'Journée'])->default('Journée');
            $table->enum('justification', ['Non justifié', 'Justifié', 'En attente'])->default('En attente');
            $table->foreignId('recorded_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absences');
    }
};