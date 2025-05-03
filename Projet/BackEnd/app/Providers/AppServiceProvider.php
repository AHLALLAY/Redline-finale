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
    protected $arr = [
        AuthInterface::class => AuthRepository::class,
        AccountantInterface::class => AccountantRepository::class,
        AdminInterface::class => AdminRepository::class,
        TeacherInterface::class => TeacherRepository::class,
    ];

    public function register(): void
    {
        $repositoryList = array_values($this->arr);
        $interfacesList = array_keys($this->arr);
        for ($i = 0; $i < count($repositoryList); $i++) {
            $this->app->bind($interfacesList[$i], $repositoryList[$i]);
        }
    }

    public function boot(): void
    {
        //
    }
}
