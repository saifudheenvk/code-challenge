# Problem 5 - REST API with TypeScript

A robust RESTful API built with TypeScript, Express.js, MongoDB, and Redis. This application provides user and tag management features with caching, validation, and comprehensive error handling.

## Tech Stack

### Core Technologies
- **TypeScript**
- **Express.js** 
- **Redis** 

### Database & Caching
- **MongoDB** - NoSQL database for data persistence (via Mongoose ODM)
- **Redis** - In-memory data store for caching user data with 2-hour TTL

### Security & Middleware
- **Helmet** - Sets various HTTP headers to secure Express apps
- **CORS** - Cross-Origin Resource Sharing middleware
- **HPP** - Express middleware to protect against HTTP Parameter Pollution attacks
- **Compression** - Gzip compression middleware for response optimization

### Validation & Error Handling
- **Joi** - Schema validation library for request validation
- **express-async-errors** - Automatic error handling for async route handlers
- Custom error classes with proper HTTP status codes

### Logging & Monitoring
- **Bunyan** - JSON logging library for structured logging
- **Swagger Stats** - API monitoring and analytics (available at `/api-monitoring`)

### Development Tools
- **Nodemon** - Auto-restart server during development
- **ts-node** - TypeScript execution engine for Node.js
- **tsconfig-paths** - Path mapping support for TypeScript
- **PM2** - Process manager for production deployment

## Features

### 1. User Management
Create, Edit, List Users

### 2. Tag Management
Create, Edit, List tags

### 3. Health Check
- **Health Endpoint** - Monitor server status and process information
- Returns server health status with process ID and current date


### 4. Error Handling
- Global error handler middleware
- Custom error classes (BadRequestError, NotFoundError, ServerError, JoiRequestValidationError)
- Proper HTTP status codes
- Structured error responses

### 5. Caching Strategy
- Redis-based caching for user data
- Automatic cache refresh on access

## Setup Instructions

### Step 1: Clone the Repository
```bash
cd problem5
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/tags

# Redis Configuration
REDIS_HOST=redis://localhost:6379
REDIS_TTL=7200

# Client Configuration
CLIENT_URL=http://localhost:3000
```

### Step 4: Run the Application

**Development Mode:**
```bash
npm run dev
```

**Production Build:**
```bash
# Build TypeScript to JavaScript
npm run build

# Start with PM2
npm start

# Stop PM2 processes
npm run stop

# Delete PM2 processes
npm run delete
```


## API Endpoints

### Health Check
- `GET /health` - Server health status

### User Endpoints
- `POST /api/v1/users/add` - Create a new user
- `GET /api/v1/users/get/:userId` - Get user by ID
- `PUT /api/v1/users/update/:userId` - Update user
- `DELETE /api/v1/users/delete/:userId` - Delete user
- `GET /api/v1/users/getAll` - Get all users

### Tag Endpoints
- `POST /api/v1/tags/add` - Create a new tag
- `GET /api/v1/tags/get/:tagId` - Get tag by ID
- `PUT /api/v1/tags/update/:tagId` - Update tag
- `DELETE /api/v1/tags/delete/:tagId` - Delete tag
- `GET /api/v1/tags/getAll` - Get all tags (with search)