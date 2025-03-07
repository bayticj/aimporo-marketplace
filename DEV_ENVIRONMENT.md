# Development Environment Setup

This document explains how to run the development environment for real-time local development.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PHP](https://www.php.net/) (v8.1+ recommended)
- [Composer](https://getcomposer.org/)
- [PowerShell 7](https://github.com/PowerShell/PowerShell) (recommended for best experience)

## Starting the Development Environment

We've set up a convenient script to start all necessary services for local development:

1. Open a terminal in the project root directory
2. Run the following command:

```bash
.\start-dev.bat
```

This will start:
- Next.js Frontend (default: http://localhost:3003)
- Laravel Backend (default: http://localhost:8000)
- MeiliSearch (if available) (default: http://localhost:7700)

The script will automatically find available ports if the default ones are in use. The actual URLs will be displayed in the terminal when the services start.

## Real-time Development Features

### Frontend (Next.js)

The Next.js frontend is configured with:
- Hot Module Replacement (HMR) for instant UI updates
- Fast Refresh for preserving component state while editing
- Socket.IO for real-time communication

When you make changes to any frontend files, the changes will be reflected immediately in the browser without requiring a full page refresh.

### Backend (Laravel)

The Laravel backend is started with the development server, which:
- Automatically reloads when PHP files are changed
- Provides detailed error reporting
- Enables debugging tools

## Stopping the Development Environment

To stop all development servers:
1. Press `Ctrl+C` in the terminal where you started the servers
2. Confirm the prompt to terminate the batch job

## Automatic Port Conflict Resolution

Our development environment is configured to automatically handle port conflicts:

1. If a port is already in use, the script will automatically try the next available port
2. The actual URLs with the assigned ports will be displayed in the terminal
3. The Next.js frontend will try up to 5 alternative ports before giving up
4. The PowerShell script will scan for available ports for all services

## Troubleshooting

### PowerShell Execution Policy

If you encounter execution policy errors:
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Missing Dependencies

If you're missing dependencies:
- Frontend: Run `cd nextjs-frontend && npm install`
- Backend: Run `cd laravel-app && composer install`

### Port Issues

If you're still experiencing port conflicts after the automatic resolution:
1. Edit `nextjs-frontend/server.js` to change the `initialPort` variable
2. Edit `run-dev-ps7.ps1` to change the starting ports in the `Find-AvailablePort` function calls

## Manual Start (Alternative)

If you prefer to start services manually:

### Frontend
```bash
cd nextjs-frontend
npm run dev
# Or specify a custom port:
node server.js 3004
```

### Backend
```bash
cd laravel-app
php artisan serve --port=8000
```

### MeiliSearch
```bash
.\meilisearch.exe --http-addr 127.0.0.1:7700
``` 