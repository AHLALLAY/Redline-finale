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
        Schema::create('time_table', function (Blueprint $table) {
            $table->id();
            $table->string('level');
            $table->string('group');
            $table->integer('class_room_N');
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->string('subject_school');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_table');
    }
};
