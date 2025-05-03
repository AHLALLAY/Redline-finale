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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->date('birth_date');
            $table->string('birth_place');
            $table->enum('gender', ['Masculin', 'Féminin']);
            $table->foreignId('class_id')->constrainted('classes')->onDelete('restrict');
            $table->string('parent_name');
            $table->string('parent_cin');
            $table->string('address');
            $table->string('phone')->nullable();
            $table->enum('decision', ['success', 'failed', 'excluded'])->default('in fomation');
            $table->boolean('is_deleted')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
