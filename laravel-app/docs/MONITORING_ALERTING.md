# Monitoring and Alerting

This document outlines the monitoring and alerting system for the Aimporo Marketplace application.

## Monitoring System Overview

The application uses a combination of health checks, log aggregation, and error tracking to monitor the health and performance of the system. The following components are monitored:

1. **Database**: Checks database connectivity and basic query functionality
2. **Cache**: Verifies cache read/write operations
3. **Storage**: Ensures storage systems are accessible and functioning
4. **Queue**: Confirms queue system is operational

## Health Checks

Health checks are performed regularly to ensure all components of the application are functioning correctly. The health check endpoint is available at:

- `/api/health` - Public health check endpoint
- `/api/v1/health` - Versioned API health check endpoint

### Health Check Schedule

Health checks are run automatically according to the schedule defined in the `.env` file (`MONITORING_HEALTH_CHECK_SCHEDULE`). The default is hourly.

### Manual Health Checks

You can manually trigger health checks using the following Artisan command:

```bash
php artisan health:check
```

## Alerting System

The application sends alerts when health checks fail or when errors are detected. Alerts are sent via:

1. **Email**: Notifications are sent to the email addresses defined in `MONITORING_ALERT_EMAILS`
2. **Slack**: Notifications are sent to the Slack channel defined in `MONITORING_SLACK_CHANNEL` using the webhook URL in `MONITORING_SLACK_WEBHOOK_URL`

### Alert Types

The following types of alerts are sent:

1. **Health Check Failures**: Sent when a health check fails
2. **Backup Failures**: Sent when a backup operation fails
3. **Error Tracking**: Sent when critical errors are detected by Sentry

## Log Aggregation

Logs are aggregated using the following services:

1. **Papertrail**: Application logs are sent to Papertrail for centralized logging
2. **Loggly**: Additional log aggregation is provided by Loggly

### Log Channels

The application uses the following log channels:

1. **stack**: The main log channel that includes multiple channels
2. **single**: Logs to a single file
3. **daily**: Logs to daily files
4. **slack**: Logs critical errors to Slack
5. **papertrail**: Logs to Papertrail
6. **sentry**: Logs errors to Sentry
7. **loggly**: Logs to Loggly

## Error Tracking

The application uses Sentry for error tracking. Errors are automatically captured and sent to Sentry for analysis.

### Sentry Configuration

Sentry is configured with the following settings:

1. **DSN**: The Sentry DSN is defined in `SENTRY_LARAVEL_DSN`
2. **Environment**: The environment is defined in `SENTRY_ENVIRONMENT`
3. **Release**: The release version is defined in `SENTRY_RELEASE`
4. **Sample Rate**: The trace sample rate is defined in `SENTRY_TRACES_SAMPLE_RATE`

## Monitoring Dashboard

The application does not include a built-in monitoring dashboard. Instead, it relies on the following external services:

1. **Sentry Dashboard**: For error tracking and performance monitoring
2. **Papertrail Dashboard**: For log analysis
3. **Loggly Dashboard**: For additional log analysis

## Setting Up Monitoring

To set up monitoring for the application, follow these steps:

1. Configure the `.env` file with the appropriate values for:
   - `MONITORING_ALERT_EMAILS`
   - `MONITORING_SLACK_WEBHOOK_URL`
   - `MONITORING_SLACK_CHANNEL`
   - `MONITORING_HEALTH_CHECK_SCHEDULE`
   - `PAPERTRAIL_URL` and `PAPERTRAIL_PORT`
   - `LOGGLY_TOKEN` and `LOGGLY_TAG`
   - Sentry configuration variables

2. Ensure the scheduler is running to execute health checks and backups:
   ```bash
   * * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
   ```

3. Set up external monitoring services:
   - Create a Sentry project and configure the DSN
   - Set up a Papertrail account and configure the log destination
   - Set up a Loggly account and configure the token

## Responding to Alerts

When an alert is received, follow these steps:

1. Check the logs for more information about the issue
2. Verify the health of the system using the health check endpoint
3. Investigate the specific component that is failing
4. Take appropriate action to resolve the issue
5. Document the issue and resolution for future reference

## Maintenance Mode

If maintenance is required, you can put the application in maintenance mode using:

```bash
php artisan down --message="Maintenance in progress" --retry=60
```

To bring the application back online:

```bash
php artisan up
``` 