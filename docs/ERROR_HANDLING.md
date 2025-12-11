# Error Handling Documentation

## Overview
The error handler automatically maps MongoDB and application errors to appropriate HTTP status codes and user-friendly messages.

## Error Mappings

### MongoDB Errors

| Error Type | MongoDB Code | HTTP Status | Example Message |
|------------|--------------|-------------|-----------------|
| Duplicate Key | 11000 | 409 Conflict | "Email already exists" |
| Validation Error | - | 400 Bad Request | "Email is required" |
| Cast Error | - | 400 Bad Request | "Invalid data format" |

### Custom Application Errors

| Error Class | HTTP Status | Example Usage |
|-------------|-------------|---------------|
| `NotFoundError` | 404 | User not found |
| `BadRequestError` | 400 | Invalid input |
| `UnauthorizedError` | 401 | Authentication required |
| `ForbiddenError` | 403 | Access denied |
| `AppError` | Custom | Any custom error |

## Usage

### In Controllers

```typescript
import { mapError } from '../utils/error-handler';

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getById(req.params.id);
    successResponse(res, user, 'User retrieved successfully');
  } catch (error) {
    const { message, statusCode } = mapError(error);
    errorResponse(res, message, statusCode);
  }
};
```

### Throwing Custom Errors

```typescript
import { NotFoundError, BadRequestError } from '../utils/error-handler';

export const getById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError('Invalid user ID format');
  }
  
  const user = await User.findById(id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  return user;
};
```

## Response Examples

### Duplicate Email (409 Conflict)
```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "existing@example.com"}'
```

Response:
```json
{
  "success": false,
  "message": "Email already exists"
}
```
HTTP Status: `409 Conflict`

### Missing Required Field (400 Bad Request)
```bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John"}'
```

Response:
```json
{
  "success": false,
  "message": "Name and email are required"
}
```
HTTP Status: `400 Bad Request`

### Custom Not Found Error (404)
```typescript
throw new NotFoundError('User not found');
```

Response:
```json
{
  "success": false,
  "message": "User not found"
}
```
HTTP Status: `404 Not Found`

## Benefits

✅ **Automatic Status Codes** - No need to manually specify status codes for common errors  
✅ **User-Friendly Messages** - Complex MongoDB errors converted to readable messages  
✅ **Type Safety** - Full TypeScript support with proper error types  
✅ **Consistent Responses** - All errors follow the same response format  
✅ **Extensible** - Easy to add new error types and mappings
