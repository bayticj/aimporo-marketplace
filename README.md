# Aimporo Marketplace

A comprehensive marketplace platform built with Laravel and Next.js.

## Project Structure

- `laravel-app/` - Backend API built with Laravel
- `nextjs-frontend/` - Frontend application built with Next.js

## Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 16 or higher
- npm or Yarn
- XAMPP (for local development)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/bayticj/aimporo-marketplace-backend.git
cd aimporo-marketplace-backend
```

### 2. Backend Setup (Laravel)

1. Install XAMPP and start Apache and MySQL services
2. Create a database named `aimporo_marketplace` in phpMyAdmin
3. Navigate to the Laravel app directory:
   ```bash
   cd laravel-app
   ```
4. Install dependencies:
   ```bash
   composer install
   ```
5. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
6. Generate application key:
   ```bash
   php artisan key:generate
   ```
7. Run the database setup script:
   ```bash
   php setup_database.php
   ```
8. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

### 3. Frontend Setup (Next.js)

1. Navigate to the Next.js frontend directory:
   ```bash
   cd nextjs-frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```
4. Start the Next.js development server:
   ```bash
   yarn dev
   ```

## Accessing the Application

- Backend API: http://localhost:8000
- Frontend: http://localhost:3000
- phpMyAdmin: http://localhost/phpmyadmin

## Development Workflow

1. Make changes to the codebase
2. Test changes locally
3. Commit changes to Git
4. Push changes to GitHub
5. Deploy to production

## Deployment

### Backend (Laravel)

The Laravel backend can be deployed to any PHP-compatible hosting service.

### Frontend (Next.js)

The Next.js frontend is deployed to Vercel.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# React Workspace

This workspace contains multiple React applications and related projects.

## Getting Started

### Running the Next.js Frontend

You can run the Next.js frontend application using the following commands from the root directory:

```bash
# Install dependencies (if not already installed)
cd nextjs-frontend && npm install && cd ..

# Run the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm run start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `nextjs-frontend/`: Next.js application
- `laravel-app/`: Laravel backend application
- Other documentation and configuration files

## Notes

- Make sure you have Node.js and npm installed on your system.
- For backend services, you may need to set up and run them separately. 