<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class SessionSecurity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Generate CSRF token if it doesn't exist
        if (!$request->session()->has('csrf_token')) {
            $request->session()->put('csrf_token', Str::random(40));
        }

        // Check for session hijacking by comparing user agent and IP
        if ($request->session()->has('user_agent') && $request->session()->has('ip_address')) {
            $storedUserAgent = $request->session()->get('user_agent');
            $storedIpAddress = $request->session()->get('ip_address');

            if ($storedUserAgent !== $request->userAgent() || $storedIpAddress !== $request->ip()) {
                // Potential session hijacking detected
                $request->session()->invalidate();
                $request->session()->regenerate();
                
                // Store new values
                $request->session()->put('user_agent', $request->userAgent());
                $request->session()->put('ip_address', $request->ip());
                
                // Log the potential security breach
                \Log::warning('Potential session hijacking detected', [
                    'stored_user_agent' => $storedUserAgent,
                    'current_user_agent' => $request->userAgent(),
                    'stored_ip' => $storedIpAddress,
                    'current_ip' => $request->ip(),
                ]);
                
                return response()->json([
                    'message' => 'Session invalidated due to security concerns. Please log in again.'
                ], 401);
            }
        } else {
            // First request, store the values
            $request->session()->put('user_agent', $request->userAgent());
            $request->session()->put('ip_address', $request->ip());
        }

        // Regenerate session ID periodically
        if (!$request->session()->has('last_activity') || 
            (time() - $request->session()->get('last_activity') > config('session.lifetime') * 30)) {
            $request->session()->regenerate();
            $request->session()->put('last_activity', time());
        }

        $response = $next($request);

        // Add security headers
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'");
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

        return $response;
    }
}
