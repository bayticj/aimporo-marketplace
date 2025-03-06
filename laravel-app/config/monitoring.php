<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Monitoring Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains the configuration for the application's monitoring
    | system, including health checks and alert notifications.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Alert Recipients
    |--------------------------------------------------------------------------
    |
    | This is a list of email addresses that should receive alerts when
    | health checks fail or other monitoring events occur.
    |
    */
    'alert_recipients' => explode(',', env('MONITORING_ALERT_EMAILS', 'admin@aimporo-marketplace.com')),

    /*
    |--------------------------------------------------------------------------
    | Slack Webhook URL
    |--------------------------------------------------------------------------
    |
    | The Slack webhook URL to send notifications to. If not set, Slack
    | notifications will not be sent.
    |
    */
    'slack_webhook_url' => env('MONITORING_SLACK_WEBHOOK_URL'),

    /*
    |--------------------------------------------------------------------------
    | Slack Channel
    |--------------------------------------------------------------------------
    |
    | The Slack channel to send notifications to. If not set, the default
    | channel for the webhook will be used.
    |
    */
    'slack_channel' => env('MONITORING_SLACK_CHANNEL', '#monitoring'),

    /*
    |--------------------------------------------------------------------------
    | Health Check Schedule
    |--------------------------------------------------------------------------
    |
    | The schedule for running health checks. This is the frequency at which
    | the health check command will be run by the scheduler.
    |
    | Supported: "minute", "hourly", "daily", "weekly"
    |
    */
    'health_check_schedule' => env('MONITORING_HEALTH_CHECK_SCHEDULE', 'hourly'),

    /*
    |--------------------------------------------------------------------------
    | Health Check Timeout
    |--------------------------------------------------------------------------
    |
    | The maximum time in seconds that a health check should take to complete.
    | If a health check takes longer than this, it will be considered failed.
    |
    */
    'health_check_timeout' => env('MONITORING_HEALTH_CHECK_TIMEOUT', 5),

    /*
    |--------------------------------------------------------------------------
    | Health Check Components
    |--------------------------------------------------------------------------
    |
    | The components that should be checked by the health check system.
    | Set to false to disable a specific check.
    |
    */
    'components' => [
        'database' => true,
        'cache' => true,
        'storage' => true,
        'queue' => true,
    ],
]; 