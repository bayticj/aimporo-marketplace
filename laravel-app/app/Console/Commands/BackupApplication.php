<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class BackupApplication extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:application';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup the entire application using spatie/laravel-backup';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting full application backup...');
        
        try {
            // Run the backup command for the full application
            $this->call('backup:run');
            
            $this->info('Full application backup completed successfully!');
            Log::info('Full application backup completed successfully.');
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Full application backup failed: ' . $e->getMessage());
            Log::error('Full application backup failed: ' . $e->getMessage());
            
            return Command::FAILURE;
        }
    }
} 