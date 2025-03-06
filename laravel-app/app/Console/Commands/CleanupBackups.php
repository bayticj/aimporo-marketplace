<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CleanupBackups extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up old backups using spatie/laravel-backup';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting backup cleanup...');
        
        try {
            // Run the cleanup command
            $this->call('backup:clean');
            
            $this->info('Backup cleanup completed successfully!');
            Log::info('Backup cleanup completed successfully.');
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Backup cleanup failed: ' . $e->getMessage());
            Log::error('Backup cleanup failed: ' . $e->getMessage());
            
            return Command::FAILURE;
        }
    }
} 