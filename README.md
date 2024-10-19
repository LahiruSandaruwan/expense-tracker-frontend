<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About This Project

This is a Laravel 8 backend project for an expense tracker application. The project uses Laravel Sanctum for secure API authentication and is designed to integrate seamlessly with a frontend React application.

### Laravel Version
- Laravel **8**

### Authentication Method
- **Laravel Sanctum**: Provides token-based authentication for API access.

## Table of Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Available Endpoints](#available-endpoints)
4. [Validation and Error Handling](#validation-and-error-handling)
5. [Running the Project](#running-the-project)
6. [License](#license)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LahiruSandaruwan/expense-tracker-backend.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd expense-tracker-backend
   ```

3. **Install dependencies**:
   ```bash
   composer install
   ```

4. **Copy the `.env.example` file to create your environment file**:
   ```bash
   cp .env.example .env
   ```

5. **Generate an application key**:
   ```bash
   php artisan key:generate
   ```

6. **Set up your database**:
   - Update your `.env` file with your database credentials:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=your_database_name
     DB_USERNAME=your_database_user
     DB_PASSWORD=your_database_password
     ```

7. **Run the database migrations**:
   ```bash
   php artisan migrate
   ```

8. **Install Laravel Sanctum**:
   ```bash
   composer require laravel/sanctum
   ```

9. **Publish Sanctum configuration**:
   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   ```

## Configuration

- **CSRF Token Handling**: The frontend application must fetch the CSRF token from `/sanctum/csrf-cookie` before making any API requests.
- **API Middleware**: Sanctum middleware is added to API routes to ensure only authenticated users can access the endpoints.

## Available Endpoints

The API provides the following routes:

### Authentication Routes
- **POST** `/login`: Logs in the user and returns a token.
- **POST** `/register`: Registers a new user.
- **POST** `/logout`: Logs out the authenticated user.

### Expense Routes
- **GET** `/api/expenses`: Fetches all expenses for the authenticated user.
- **POST** `/api/expenses`: Adds a new expense (title must be unique per user).
- **PUT** `/api/expenses/{id}`: Updates an existing expense.
- **DELETE** `/api/expenses/{id}`: Deletes an expense.

## Validation and Error Handling

- **Unique Title Validation**: The backend validates that each expense title is unique for each user. If a duplicate title is detected, a `422 Unprocessable Entity` error is returned with a message.
- **Error Handling**: All validation errors return JSON responses with appropriate HTTP status codes (e.g., `401 Unauthorized` for unauthenticated access).

## Running the Project

To run the backend locally:

1. **Serve the application**:
   ```bash
   php artisan serve
   ```
   The application will run on [http://127.0.0.1:8000](http://127.0.0.1:8000) by default.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
```

### Additional Notes:
- Replace the **GitHub repository URL** in the `git clone` command with the actual URL of your repository.
- Ensure that your `.env` settings match your local environment.