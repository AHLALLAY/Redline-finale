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
            $table->enum('level',['1ére année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année']);
            $table->enum('group',['A', 'B', 'C', 'D']);
            $table->string('parent_name');
            $table->string('parent_cin');
            $table->string('address');
            $table->string('phone')->nullable();
            $table->enum('decision', ['progress', 'success', 'failed', 'excluded'])->default('progress');
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
