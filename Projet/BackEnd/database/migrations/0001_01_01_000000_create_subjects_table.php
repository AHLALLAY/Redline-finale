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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->integer('weekly_hours')->default(1);
            $table->enum('category', ['Sciences', 'Langues', 'Mathématiques', 'Arts', 'Sport', 'Autre']);
            $table->enum('teaching_level', ['1ére année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};