<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Notifications\HealthCheckFailed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;

class HealthCheckController extends Controller
{
    /**
     * Check the health of the application.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function check()
    {
        $checks = [
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
            'environment' => app()->environment(),
            'checks' => [
                'database' => $this->checkDatabase(),
                'cache' => $this->checkCache(),
                'storage' => $this->checkStorage(),
                'queue' => $this->checkQueue(),
            ],
        ];

        // If any check failed, set the overall status to error
        $failedChecks = [];
        foreach ($checks['checks'] as $name => $check) {
            if ($check['status'] === 'error') {
                $checks['status'] = 'error';
                $failedChecks[$name] = $check['message'];
            }
        }

        // Send notification if any checks failed
        if (!empty($failedChecks)) {
            $this->sendHealthCheckFailedNotification($failedChecks, $checks['status']);
        }

        return response()->json($checks);
    }

    /**
     * Send notification when health checks fail.
     *
     * @param array $failedChecks
     * @param string $overallStatus
     * @return void
     */
    private function sendHealthCheckFailedNotification(array $failedChecks, string $overallStatus)
    {
        try {
            $recipients = config('monitoring.alert_recipients', []);
            
            if (!empty($recipients)) {
                Notification::route('mail', $recipients)
                    ->route('slack', config('monitoring.slack_webhook_url'))
                    ->notify(new HealthCheckFailed($failedChecks, $overallStatus));
                
                Log::info('Health check failed notification sent', [
                    'recipients' => $recipients,
                    'failed_checks' => $failedChecks,
                ]);
            } else {
                Log::warning('Health check failed but no recipients configured for notifications');
            }
        } catch (\Exception $e) {
            Log::error('Failed to send health check notification', [
                'exception' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Check the database connection.
     *
     * @return array
     */
    private function checkDatabase()
    {
        try {
            // Try to connect to the database
            DB::connection()->getPdo();
            
            // Run a simple query to ensure the database is working
            DB::select('SELECT 1');
            
            return [
                'status' => 'ok',
                'message' => 'Database connection successful',
                'connection' => config('database.default'),
            ];
        } catch (\Exception $e) {
            Log::error('Health check: Database connection failed', [
                'exception' => $e->getMessage(),
            ]);
            
            return [
                'status' => 'error',
                'message' => 'Database connection failed',
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Check the cache.
     *
     * @return array
     */
    private function checkCache()
    {
        try {
            // Try to write to and read from the cache
            $key = 'health_check_' . time();
            $value = 'ok';
            
            Cache::put($key, $value, 10);
            $result = Cache::get($key);
            
            if ($result !== $value) {
                throw new \Exception('Cache read/write test failed');
            }
            
            return [
                'status' => 'ok',
                'message' => 'Cache is working',
                'driver' => config('cache.default'),
            ];
        } catch (\Exception $e) {
            Log::error('Health check: Cache test failed', [
                'exception' => $e->getMessage(),
            ]);
            
            return [
                'status' => 'error',
                'message' => 'Cache test failed',
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Check the storage.
     *
     * @return array
     */
    private function checkStorage()
    {
        try {
            // Try to write to and read from the storage
            $disk = config('filesystems.default');
            $key = 'health_check_' . time() . '.txt';
            $value = 'ok';
            
            Storage::disk($disk)->put($key, $value);
            $result = Storage::disk($disk)->get($key);
            
            if ($result !== $value) {
                throw new \Exception('Storage read/write test failed');
            }
            
            // Clean up
            Storage::disk($disk)->delete($key);
            
            return [
                'status' => 'ok',
                'message' => 'Storage is working',
                'disk' => $disk,
            ];
        } catch (\Exception $e) {
            Log::error('Health check: Storage test failed', [
                'exception' => $e->getMessage(),
            ]);
            
            return [
                'status' => 'error',
                'message' => 'Storage test failed',
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Check the queue.
     *
     * @return array
     */
    private function checkQueue()
    {
        try {
            // Check if the queue connection is available
            $connection = config('queue.default');
            
            // For database queue, check if the jobs table exists
            if ($connection === 'database') {
                if (!Schema::hasTable('jobs')) {
                    throw new \Exception('Jobs table does not exist');
                }
            }
            
            return [
                'status' => 'ok',
                'message' => 'Queue connection is available',
                'connection' => $connection,
            ];
        } catch (\Exception $e) {
            Log::error('Health check: Queue test failed', [
                'exception' => $e->getMessage(),
            ]);
            
            return [
                'status' => 'error',
                'message' => 'Queue test failed',
                'error' => $e->getMessage(),
            ];
        }
    }
} 