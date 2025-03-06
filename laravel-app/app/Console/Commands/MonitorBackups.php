<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class MonitorBackups extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Monitor backups using spatie/laravel-backup';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting backup monitoring...');
        
        try {
            // Run the monitor command from spatie/laravel-backup
            $this->call('backup:monitor');
            
            $this->info('Backup monitoring completed successfully!');
            Log::info('Backup monitoring completed successfully.');
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Backup monitoring failed: ' . $e->getMessage());
            Log::error('Backup monitoring failed: ' . $e->getMessage());
            
            return Command::FAILURE;
        }
    }
} 