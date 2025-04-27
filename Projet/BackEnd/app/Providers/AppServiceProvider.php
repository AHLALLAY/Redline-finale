<?php

namespace App\Providers;

use App\Interfaces\AccountantInterface;
use App\Interfaces\AdminInterface;
use App\Interfaces\AuthInterface;
use App\Interfaces\TeacherInterface;
use App\Repositories\AccountantRepository;
use App\Repositories\AdminRepository;
use App\Repositories\AuthRepository;
use App\Repositories\TeacherRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthInterface::class, AuthRepository::class);
        $this->app->bind(AccountantInterface::class, AccountantRepository::class);
        $this->app->bind(AdminInterface::class, AdminRepository::class);
        $this->app->bind(TeacherInterface::class, TeacherRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
