# Backup and Recovery Procedures

This document outlines the backup and recovery procedures for the Aimporo Marketplace application.

## Backup System Overview

The application uses the [spatie/laravel-backup](https://github.com/spatie/laravel-backup) package to handle automated backups. The following backup types are configured:

1. **Database Backups**: Daily backups of the database only
2. **Full Application Backups**: Weekly backups of the entire application, including files and database
3. **Backup Cleanup**: Automated cleanup of old backups based on retention policy
4. **Backup Monitoring**: Daily checks to ensure backups are healthy

## Backup Schedule

- **Database Backups**: Run daily at 1:00 AM
- **Full Application Backups**: Run weekly on Sundays at 2:00 AM
- **Backup Cleanup**: Run daily at 3:00 AM
- **Backup Monitoring**: Run daily at 4:00 AM

## Backup Storage

Backups are stored in the following locations:

1. **Local Storage**: All backups are stored locally in `storage/app/backups`
2. **S3 Storage**: When configured, backups are also stored in an S3 bucket for off-site storage

## Backup Retention Policy

The backup retention policy is as follows:

- Keep all backups for 7 days
- Keep daily backups for 16 days
- Keep weekly backups for 8 weeks
- Keep monthly backups for 4 months
- Keep yearly backups for 2 years
- Delete oldest backups when total size exceeds 5GB

## Manual Backup Commands

You can manually trigger backups using the following Artisan commands:

```bash
# Database backup only
php artisan backup:database

# Full application backup
php artisan backup:application

# Clean up old backups
php artisan backup:cleanup

# Monitor backups
php artisan backup:check
```

## Recovery Procedures

### Database Recovery

To restore a database from a backup:

1. Locate the backup file in `storage/app/backups`
2. Extract the backup file (if encrypted, use the password from the `.env` file)
3. Locate the database dump file (typically named `mysql-<database-name>.sql`)
4. Import the database dump:

```bash
mysql -u <username> -p <database-name> < mysql-<database-name>.sql
```

### Full Application Recovery

To restore the entire application from a backup:

1. Set up a fresh installation of the application
2. Locate the backup file in `storage/app/backups` or from your S3 bucket
3. Extract the backup file (if encrypted, use the password from the `.env` file)
4. Replace the application files with the files from the backup
5. Import the database as described in the Database Recovery section
6. Run the following commands:

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan migrate
```

## Backup Testing

It's recommended to test the backup and recovery procedures regularly to ensure they work as expected. Schedule a quarterly test of the recovery process using the following steps:

1. Create a test environment
2. Restore the latest backup to the test environment
3. Verify the application works correctly
4. Document any issues encountered during the test

## Disaster Recovery

In case of a complete system failure:

1. Set up a new server with the required dependencies
2. Clone the application repository
3. Restore the latest backup as described in the Full Application Recovery section
4. Update DNS records to point to the new server
5. Verify the application is working correctly

## Monitoring and Alerts

Backup monitoring is configured to send alerts via email and Slack when:

- A backup fails
- A backup is unhealthy (too old or too large)
- Cleanup of old backups fails

Ensure that the email and Slack webhook configurations are correctly set in the `.env` file. 