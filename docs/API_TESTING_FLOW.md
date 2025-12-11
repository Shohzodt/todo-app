# API Testing Guide

## Your API Endpoints

Your server runs on `http://localhost:8000` with the following user endpoints:

- **GET** `/users` - Get all users
- **POST** `/users` - Create a new user

---

## Method 1: Using cURL (Terminal)

### Get All Users
```bash
curl http://localhost:8000/users
```

### Create a New User
```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

---

## Method 2: Using HTTPie (Easier Syntax)

Install HTTPie first:
```bash
brew install httpie
```

### Get All Users
```bash
http GET http://localhost:8000/users
```

### Create a New User
```bash
http POST http://localhost:8000/users name="Jane Smith" email="jane@example.com"
```

---

## Method 3: Using Postman or Insomnia

1. Download [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)
2. Create a new request
3. Set the URL and method as shown above
4. For POST requests, add JSON body in the Body tab

---

## Method 4: Using VS Code REST Client Extension

Install the "REST Client" extension, then create a file `test.http`:

```http
### Get all users
GET http://localhost:8000/users

### Create a new user
POST http://localhost:8000/users
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com"
}
```

Click "Send Request" above each request to test.

---

## Quick Start Steps

1. **Start your server**:
   ```bash
   npm run dev
   ```

2. **Open a new terminal** and test with cURL:
   ```bash
   # Create a user
   curl -X POST http://localhost:8000/users \
     -H "Content-Type: application/json" \
     -d '{"name": "Test User", "email": "test@example.com"}'
   
   # Get all users
   curl http://localhost:8000/users
   ```

---

## Expected Responses

### Successful User Creation (POST /users)
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-12-09T13:08:00.000Z",
    "updatedAt": "2025-12-09T13:08:00.000Z",
    "__v": 0
  }
}
```

### Get All Users (GET /users)
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-12-09T13:08:00.000Z",
      "updatedAt": "2025-12-09T13:08:00.000Z",
      "__v": 0
    }
  ]
}
```

### Error Response (Missing Fields)
```json
{
  "success": false,
  "message": "Name and email are required"
}
```
