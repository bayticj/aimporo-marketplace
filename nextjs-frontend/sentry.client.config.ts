import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || '0.1'),
  
  // Performance Monitoring
  // These settings are compatible with Sentry NextJS SDK v9
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  
  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
  
  // Optional: Configure beforeSend to filter or modify events before they're sent to Sentry
  beforeSend(event) {
    // Check if it's a development environment
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry event:', event);
    }
    return event;
  }
}); 