<?php

namespace App\Console\Commands;

use App\Http\Controllers\API\HealthCheckController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class RunHealthChecks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'health:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run health checks and send notifications if any fail';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting health checks...');
        
        try {
            // Create an instance of the HealthCheckController
            $controller = app()->make(HealthCheckController::class);
            
            // Run the health checks
            $response = $controller->check();
            
            // Get the response data
            $data = $response->getData(true);
            
            // Output the results
            $this->info('Health check status: ' . $data['status']);
            $this->info('Environment: ' . $data['environment']);
            $this->info('Timestamp: ' . $data['timestamp']);
            
            $this->info('Check results:');
            foreach ($data['checks'] as $name => $check) {
                $status = $check['status'] === 'ok' ? '<info>OK</info>' : '<error>ERROR</error>';
                $this->line("- {$name}: {$status} ({$check['message']})");
            }
            
            // Return success or failure based on overall status
            return $data['status'] === 'ok' ? Command::SUCCESS : Command::FAILURE;
        } catch (\Exception $e) {
            $this->error('Health check failed: ' . $e->getMessage());
            Log::error('Health check command failed', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return Command::FAILURE;
        }
    }
} 