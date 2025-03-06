<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class BackupDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup the database using spatie/laravel-backup';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting database backup...');
        
        try {
            // Run the backup command
            $this->call('backup:run', [
                '--only-db' => true,
            ]);
            
            $this->info('Database backup completed successfully!');
            Log::info('Database backup completed successfully.');
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Database backup failed: ' . $e->getMessage());
            Log::error('Database backup failed: ' . $e->getMessage());
            
            return Command::FAILURE;
        }
    }
} 