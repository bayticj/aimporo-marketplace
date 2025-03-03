<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AuditLogger
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Process the request
        $response = $next($request);
        
        // Don't log OPTIONS requests (CORS preflight)
        if ($request->method() === 'OPTIONS') {
            return $response;
        }
        
        // Get the authenticated user (if any)
        $user = $request->user();
        $userId = $user ? $user->id : 'guest';
        
        // Prepare log data
        $logData = [
            'user_id' => $userId,
            'ip' => $request->ip(),
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'user_agent' => $request->header('User-Agent'),
            'status_code' => $response->getStatusCode(),
            'timestamp' => now()->toIso8601String(),
        ];
        
        // Add request parameters (excluding sensitive data)
        $requestData = $request->except(['password', 'password_confirmation', 'token', 'api_token']);
        if (!empty($requestData)) {
            $logData['request_data'] = json_encode($requestData);
        }
        
        // Log the request
        Log::channel('audit')->info('API Request', $logData);
        
        return $response;
    }
} 