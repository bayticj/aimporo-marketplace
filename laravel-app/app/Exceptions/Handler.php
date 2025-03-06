<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Sentry\Laravel\Integration;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // Register Sentry error reporting
        $this->reportable(function (Throwable $e) {
            if (app()->bound('sentry') && $this->shouldReport($e)) {
                app('sentry')->captureException($e);
            }
        });
        
        // Don't report specific exceptions
        $this->reportable(function (\Illuminate\Auth\AuthenticationException $e) {
            return false;
        });
        
        $this->reportable(function (\Illuminate\Validation\ValidationException $e) {
            return false;
        });
        
        $this->reportable(function (\Illuminate\Http\Exceptions\ThrottleRequestsException $e) {
            return false;
        });
    }
    
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $e
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $e)
    {
        // Add request information to Sentry scope
        if (app()->bound('sentry')) {
            Integration::configureScope(function (\Sentry\State\Scope $scope) use ($request): void {
                $scope->setContext('request', [
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                ]);
                
                if ($request->user()) {
                    $scope->setUser([
                        'id' => $request->user()->id,
                        'email' => $request->user()->email,
                    ]);
                }
            });
        }
        
        return parent::render($request, $e);
    }
} 