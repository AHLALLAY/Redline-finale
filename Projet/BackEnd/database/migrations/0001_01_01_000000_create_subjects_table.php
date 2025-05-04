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
            $table->enum('nom', [
                'Langue Arabe',
                'Langue Française',
                'Langue Amazighe',
                'Langue Anglaise',
                'Langue Espagnole',
                'Éducation Islamique',
                'Mathématiques',
                'Activité Scientifique',
                'Informatique',
                'Sciences Sociales',
                'Éducation Artistique',
                'Éducation Physique',
                'Éducation Musicale',
                'Robotique',
                'Éducation Financière',
            ]);
            $table->string('code')->unique();
            $table->integer('weekly_hours');
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