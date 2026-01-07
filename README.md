# Book Management Application - MERN Stack

A full-stack book management application built with React.js, Node.js, Express.js, and MongoDB. This application allows users to register, login, and manage their personal book collection.

## Features

- ✅ User Authentication (Register & Login)
- ✅ JWT-based Authentication
- ✅ Protected Routes
- ✅ Add Books (Title & Author)
- ✅ View All Books
- ✅ Responsive Design with Material-UI
- ✅ Context API for State Management
- ✅ Form Validation
- ✅ Error Handling

## Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Material-UI (MUI)
- Context API
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- express-validator

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd Taskk
```

### Step 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
# Copy the example file
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookmanagement
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookmanagement

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Important:** Replace `your_super_secret_jwt_key_change_this_in_production` with a strong random string for production use.

5. Start MongoDB:
   - **Local MongoDB:** Make sure MongoDB is running on your system
   - **MongoDB Atlas:** Use your connection string in the `.env` file

6. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```bash
# Copy the example file
cp .env.example .env
```

4. Update the `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000` and will automatically open in your browser.

## Project Structure

```
Taskk/
├── backend/
│   ├── models/
│   │   ├── Book.js          # Book schema
│   │   └── User.js          # User schema
│   ├── routes/
│   │   ├── authRoutes.js    # Authentication routes
│   │   └── bookRoutes.js    # Book CRUD routes
│   ├── middleware/
│   │   └── authMiddleware.js # JWT authentication middleware
│   ├── server.js             # Express server setup
│   ├── package.json
│   └── .env                 # Environment variables
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookForm.js      # Add book form
│   │   │   ├── BookList.js      # Display books list
│   │   │   └── PrivateRoute.js  # Protected route component
│   │   ├── context/
│   │   │   ├── AuthContext.js   # Authentication context
│   │   │   └── BookContext.js   # Book management context
│   │   ├── pages/
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Registration page
│   │   │   └── Dashboard.js     # Main dashboard
│   │   ├── App.js               # Main app component
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   └── .env                    # Environment variables
│
└── README.md
```

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Book Endpoints (Protected - Requires JWT Token)

- `GET /api/books` - Get all books
  - Headers: `Authorization: Bearer <token>`

- `POST /api/books` - Add a new book
  - Headers: `Authorization: Bearer <token>`
  ```json
  {
    "title": "Book Title",
    "author": "Author Name"
  }
  ```

## Usage Guide

1. **Register a New Account:**
   - Navigate to `/register`
   - Enter your email and password (minimum 6 characters)
   - Click "Register"

2. **Login:**
   - Navigate to `/login`
   - Enter your registered email and password
   - Click "Login"

3. **Add a Book:**
   - After logging in, you'll be redirected to the dashboard
   - Fill in the "Add New Book" form with title and author
   - Click "Add Book"

4. **View Books:**
   - All your books will be displayed in cards below the form
   - Books are sorted by creation date (newest first)

5. **Logout:**
   - Click the logout icon in the top right corner

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL

