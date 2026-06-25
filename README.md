# Travola Vault

## Overview

**Travola Vault** is a secure hotel management and authentication backend built with **Node.js**, **Express.js**, and **MongoDB**. The project focuses on implementing modern authentication and authorization techniques while following backend development best practices and security standards.

## Features

### Authentication & Authorization

* User Registration (**Sign Up**)
* User Authentication (**Login**)
* JWT-based Authentication
* Protected Routes
* Role-Based Authorization
* Secure Logout Flow
* Password Update Functionality
* Password Reset Workflow
* Token Expiration Handling

### Security

* Password Hashing using `bcrypt`
* JWT Token Verification
* Environment Variables for Sensitive Data
* Request Validation using `validator`
* Protection against invalid data insertion
* Password fields excluded from query results
* Centralized Error Handling Middleware
* Secure MongoDB Schema Validation

### Database Management

* MongoDB Integration
* Mongoose Models and Schemas
* CRUD Operations
* Data Validation
* Middleware Hooks
* Query Optimization

### Additional Features

* Human-friendly URLs using `slugify`
* Modular MVC Architecture
* Reusable Utility Functions
* Clean Project Structure
* Production-ready Coding Practices

---

## Tech Stack

| Technology   | Purpose               |
| ------------ | --------------------- |
| Node.js      | Runtime Environment   |
| Express.js   | Backend Framework     |
| MongoDB      | NoSQL Database        |
| Mongoose     | ODM for MongoDB       |
| bcrypt       | Password Hashing      |
| jsonwebtoken | Authentication Tokens |
| validator    | Data Validation       |
| slugify      | URL Friendly Slugs    |

---

## Project Structure

```text
travola-vault/
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── hotelController.js
│
├── models/
│   ├── userModel.js
│   └── hotelModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── hotelRoutes.js
│
├── middleware/
│   ├── protect.js
│   └── errorHandler.js
│
├── utils/
│   ├── appError.js
│   ├── catchAsync.js
│   └── apiFeatures.js
│
├── config/
│   └── database.js
│
├── app.js
├── server.js
├── .env
├── package.json
└── README.md
```

---

## Authentication Flow

The authentication system follows the following workflow:

1. User sends a **signup request**.
2. Input data is validated.
3. Password is hashed using `bcrypt`.
4. User information is stored in MongoDB.
5. User logs in using email and password.
6. Credentials are verified.
7. A JWT token is generated and returned.
8. The client stores the token securely.
9. Protected routes verify the token before granting access.

---

## Database Management

### Creating Documents

New records are inserted using Mongoose models after passing all validation rules.

### Reading Documents

Data is retrieved using Mongoose queries with filtering, sorting, and pagination support.

### Updating Documents

Updates are validated before being written to the database to maintain consistency.

### Deleting Documents

Deletion operations are protected by authorization rules to prevent unauthorized access.

---

## Authentication Operations

### Sign Up

Creates a new user account after validating user information and hashing the password.

### Login

Authenticates the user and generates a JWT token for future requests.

### Protect Routes

Ensures that only authenticated users can access specific endpoints.

### Restrict Access

Limits certain operations to specific roles such as:

* User
* Manager
* Admin

### Update Password

Allows authenticated users to change their password securely.

### Forgot Password

Generates a secure reset token and allows users to create a new password.

### Logout

Invalidates user sessions on the client side by removing stored tokens.

---

## MongoDB and Mongoose

This project demonstrates:

* Creating schemas and models.
* Defining field validations.
* Using middleware hooks.
* Creating indexes.
* Running queries efficiently.
* Populating referenced documents.
* Handling database errors gracefully.

---

## Security Practices

Security is one of the main goals of this project.

Implemented security features include:

* Password hashing using `bcrypt`.
* JWT expiration times.
* Environment variable protection.
* Validation of incoming requests.
* Sensitive field exclusion.
* Secure error handling.
* Schema validation.
* Authentication middleware.
* Authorization middleware.
* Protection against unauthorized data modification.

---

## Learning Objectives

This repository is designed to help developers understand:

* Authentication systems.
* Authorization mechanisms.
* JWT implementation.
* Password hashing techniques.
* MongoDB fundamentals.
* Mongoose best practices.
* Express.js architecture.
* Backend security principles.
* Production-ready API design.

---

## Ideal For

This project is suitable for developers who want to learn:

* Backend Development
* REST APIs
* Authentication Systems
* MongoDB and Mongoose
* Secure API Design
* Express.js Best Practices

---

## Future Improvements

Potential future enhancements include:

* Email Verification
* Refresh Tokens
* Two-Factor Authentication (2FA)
* Rate Limiting
* API Documentation
* Docker Support
* Automated Testing
* CI/CD Pipelines

---

## License

This project is licensed under the **MIT License**.

---

## Author

Developed as a secure authentication and hotel backend reference project focused on clean architecture, scalability, and backend best practices.
