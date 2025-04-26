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
        Schema::create('text_boxes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('type',['Cours', 'Evaluation']);
            $table->text('description');
            $table->foreignId('teacher')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('text_boxes');
    }
};