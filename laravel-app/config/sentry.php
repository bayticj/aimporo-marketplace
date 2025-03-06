<?php

return [

    'dsn' => env('SENTRY_LARAVEL_DSN', env('SENTRY_DSN')),

    // capture release as git sha or use the environment variable
    'release' => env('SENTRY_RELEASE', null),

    // When left empty or `null` the Laravel environment will be used
    'environment' => env('SENTRY_ENVIRONMENT'),

    'breadcrumbs' => [
        // Capture Laravel logs in breadcrumbs
        'logs' => true,

        // Capture SQL queries in breadcrumbs
        'sql_queries' => true,

        // Capture bindings on SQL queries logged in breadcrumbs
        'sql_bindings' => true,

        // Capture queue job information in breadcrumbs
        'queue_info' => true,

        // Capture command information in breadcrumbs
        'command_info' => true,
    ],

    // @see: https://docs.sentry.io/platforms/php/guides/laravel/configuration/options/#send-default-pii
    'send_default_pii' => env('SENTRY_SEND_DEFAULT_PII', false),

    'traces_sample_rate' => (float)(env('SENTRY_TRACES_SAMPLE_RATE', 0.0)),
    
    // Set a sampling rate for performance monitoring
    'profiles_sample_rate' => (float)(env('SENTRY_PERFORMANCE_SAMPLE_RATE', 0.0)),

    'controllers_base_namespace' => env('SENTRY_CONTROLLERS_BASE_NAMESPACE', 'App\\Http\\Controllers'),
    
    // Capture exceptions in specific environments
    'in_app_exclude' => [
        base_path('vendor'),
    ],
    
    // Configure the error types to be captured
    'error_types' => E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED,
    
    // Configure the maximum length of the request body
    'max_request_body_size' => 'medium',
    
    // Configure the maximum number of breadcrumbs
    'max_breadcrumbs' => 100,
    
    // Configure the maximum value length
    'max_value_length' => 1000,
]; 