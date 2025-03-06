<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\SetupApplication::class,
        Commands\BackupDatabase::class,
        Commands\BackupApplication::class,
        Commands\CleanupBackups::class,
        Commands\MonitorBackups::class,
        Commands\RunHealthChecks::class,
    ];

    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Database backups - run daily at 1 AM
        $schedule->command('backup:database')
                ->daily()
                ->at('01:00')
                ->appendOutputTo(storage_path('logs/backup-database.log'));

        // Full application backups - run weekly on Sundays at 2 AM
        $schedule->command('backup:application')
                ->weekly()
                ->sundays()
                ->at('02:00')
                ->appendOutputTo(storage_path('logs/backup-application.log'));

        // Cleanup old backups - run daily at 3 AM
        $schedule->command('backup:cleanup')
                ->daily()
                ->at('03:00')
                ->appendOutputTo(storage_path('logs/backup-cleanup.log'));

        // Monitor backups - run daily at 4 AM
        $schedule->command('backup:check')
                ->daily()
                ->at('04:00')
                ->appendOutputTo(storage_path('logs/backup-monitor.log'));

        // Health checks - run based on configuration (default: hourly)
        $healthCheckSchedule = config('monitoring.health_check_schedule', 'hourly');
        
        $command = $schedule->command('health:check')
                ->appendOutputTo(storage_path('logs/health-check.log'));
        
        switch ($healthCheckSchedule) {
            case 'minute':
                $command->everyMinute();
                break;
            case 'hourly':
                $command->hourly();
                break;
            case 'daily':
                $command->daily();
                break;
            case 'weekly':
                $command->weekly();
                break;
            default:
                $command->hourly();
                break;
        }
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
} 