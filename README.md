# travola-vault

> A secure and production-inspired authentication and hotel management backend built with **Node.js**, **Express.js**, and **MongoDB**.

Travola Vault is designed as a practical reference project for learning modern backend development, authentication workflows, secure data handling, and scalable API architecture.

Built with security-first principles and clean code practices, this project demonstrates how real-world applications handle users, authentication, authorization, and database operations.

---

## Highlights

- JWT Authentication
- Secure Password Hashing with `bcrypt`
- User Registration and Login
- Protected Routes
- Role-Based Authorization
- MongoDB Integration with Mongoose
- Request Validation
- SEO-Friendly Slugs with `slugify`
- Async Error Handling
- Modular MVC Architecture
- Environment Variable Support
- Production-Oriented Structure

---

## Tech Stack

| Layer             | Technology     |
| ----------------- | -------------- |
| Runtime           | Node.js        |
| Framework         | Express.js     |
| Database          | MongoDB        |
| ODM               | Mongoose       |
| Authentication    | JSON Web Token |
| Password Security | bcrypt         |
| Validation        | validator      |
| Slugs             | slugify        |

---

## Project Structure

```text
travola-vault/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── services/
├── config/
│
├── app.js
├── server.js
├── package.json
├── .env
└── README.md
```

The project follows a modular architecture to improve maintainability, scalability, and code organization.

---

## Authentication Features

Travola Vault implements a complete authentication workflow commonly used in modern production applications.

### User Registration

- Validate incoming data
- Verify email uniqueness
- Hash passwords using `bcrypt`
- Store users securely in MongoDB

### Login

- Verify user credentials
- Compare hashed passwords securely
- Generate JWT access tokens
- Return authentication tokens to the client

### Protected Routes

Only authenticated users can access protected resources.

### Authorization

Restrict actions based on user roles such as:

- User
- Hotel Manager
- Admin

### Password Management

- Update Password
- Change Password
- Reset Password
- Forgot Password Workflow

---

## Authentication Flow

```text
User Signup
    ↓
Validate Request Data
    ↓
Hash Password using bcrypt
    ↓
Save User to MongoDB
    ↓
User Login
    ↓
Generate JWT Token
    ↓
Client Stores Token
    ↓
Protected API Requests
    ↓
JWT Verification Middleware
```

---

## Database Operations

The project demonstrates best practices for working with MongoDB and Mongoose.

### Create

Insert new documents safely after validation.

### Read

Retrieve data efficiently using Mongoose queries.

### Update

Update records while preserving validation rules.

### Delete

Remove resources securely with authorization checks.

---

## Security Practices

Security is one of the primary goals of Travola Vault.

Implemented protections include:

- Password Hashing with bcrypt
- JWT Expiration
- Sensitive Data Protection
- Environment Variables
- Input Validation
- Centralized Error Handling
- Secure Schema Validation
- Password Exclusion from Queries
- Authentication Middleware
- Authorization Middleware

---

## Key Backend Concepts

This project covers many important backend concepts including:

- Authentication
- Authorization
- JWT
- Password Hashing
- Express Middleware
- MongoDB Fundamentals
- Mongoose Best Practices
- Secure API Design
- Error Handling Patterns
- Scalable Project Architecture

---

## Future Improvements

Potential future enhancements include:

- Email Verification
- Refresh Tokens
- Two-Factor Authentication (2FA)
- Rate Limiting
- API Documentation
- Docker Support
- Unit Testing
- CI/CD Pipelines
- Caching Layer
- File Upload Support

---

## Project Goals

Travola Vault aims to provide:

- Clean Architecture
- Secure Authentication
- Production-Level Practices
- Scalable Code Structure
- Maintainable Codebase
- Real-World Backend Experience

---

## License

Distributed under the MIT License.

---

<div align="center">

Built with Node.js, Express.js, MongoDB, and security-first development practices.

</div>
