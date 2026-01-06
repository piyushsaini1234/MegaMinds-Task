# Backend Setup Checklist

## Quick Setup Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Create .env File
Create a `.env` file in the backend directory with the following:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookmanagement
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

**Important:** 
- Replace `your_super_secret_jwt_key_here` with a strong random string
- For MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/bookmanagement`

### 3. Start MongoDB
- **Local MongoDB:** Make sure MongoDB is running
- **MongoDB Atlas:** Use your connection string in MONGODB_URI

### 4. Start Server
```bash
npm run dev
```

## Common Issues

### Error: 500 Internal Server Error
- Check if MongoDB is running and accessible
- Verify JWT_SECRET is set in .env file
- Check MongoDB connection string is correct

### Error: 400 Bad Request
- Check if email format is valid
- Ensure password is at least 6 characters
- Check if user already exists (for registration)

### MongoDB Connection Error
- Verify MongoDB is running: `mongod` or check MongoDB service
- Check connection string format
- For Atlas, ensure IP is whitelisted

## Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
