# Status Codes Usage Guide

## Overview
All HTTP status codes are centralized in `/src/constants/status-codes.ts` for consistent usage across the application.

## Available Status Codes

### Success (2xx)
- `StatusCodes.OK` - 200
- `StatusCodes.CREATED` - 201
- `StatusCodes.ACCEPTED` - 202
- `StatusCodes.NO_CONTENT` - 204

### Client Errors (4xx)
- `StatusCodes.BAD_REQUEST` - 400
- `StatusCodes.UNAUTHORIZED` - 401
- `StatusCodes.FORBIDDEN` - 403
- `StatusCodes.NOT_FOUND` - 404
- `StatusCodes.METHOD_NOT_ALLOWED` - 405
- `StatusCodes.CONFLICT` - 409
- `StatusCodes.UNPROCESSABLE_ENTITY` - 422
- `StatusCodes.TOO_MANY_REQUESTS` - 429

### Server Errors (5xx)
- `StatusCodes.INTERNAL_SERVER_ERROR` - 500
- `StatusCodes.NOT_IMPLEMENTED` - 501
- `StatusCodes.BAD_GATEWAY` - 502
- `StatusCodes.SERVICE_UNAVAILABLE` - 503
- `StatusCodes.GATEWAY_TIMEOUT` - 504

## Usage Examples

### In Controllers

```typescript
import { StatusCodes } from '../constants/status-codes';
import { errorResponse, successResponse } from '../utils/handlers/api-response';

export const createUser = async (req: Request, res: Response) => {
  try {
    // Validation
    if (!req.body.email) {
      return errorResponse(res, 'Email is required', StatusCodes.BAD_REQUEST);
    }
    
    const user = await userService.create(req.body);
    
    // Success with 201 Created
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: user
    });
  } catch (error) {
    const { message, statusCode } = mapError(error);
    errorResponse(res, message, statusCode);
  }
};
```

### In Custom Errors

```typescript
import { StatusCodes } from '../constants/status-codes';
import { AppError } from '../utils/error-handler';

// Throw custom error with specific status code
throw new AppError('Payment required', StatusCodes.UNPROCESSABLE_ENTITY);
```

### In Error Handler

```typescript
import { StatusCodes } from '../constants/status-codes';

export const mapError = (error: unknown): ErrorResponse => {
  if (isDuplicateKeyError(error)) {
    return {
      message: 'Resource already exists',
      statusCode: StatusCodes.CONFLICT, // 409
    };
  }
  
  return {
    message: 'Internal server error',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR, // 500
  };
};
```

### In API Response Utilities

```typescript
import { StatusCodes } from '../constants/status-codes';

export const successResponse = (res: Response, data: any) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    data,
  });
};
```

## Benefits

✅ **Type Safety** - Autocomplete and type checking for status codes  
✅ **Consistency** - Same status codes used across the entire application  
✅ **Readability** - `StatusCodes.NOT_FOUND` is clearer than `404`  
✅ **Maintainability** - Single source of truth for all status codes  
✅ **No Magic Numbers** - Eliminates hardcoded numbers in the codebase

## Best Practices

1. **Always import from constants**
   ```typescript
   import { StatusCodes } from '../constants/status-codes';
   ```

2. **Use named constants instead of numbers**
   ```typescript
   // ✅ Good
   errorResponse(res, 'Not found', StatusCodes.NOT_FOUND);
   
   // ❌ Bad
   errorResponse(res, 'Not found', 404);
   ```

3. **Let error mapper handle status codes automatically**
   ```typescript
   // The mapError function automatically assigns the right status code
   const { message, statusCode } = mapError(error);
   errorResponse(res, message, statusCode);
   ```

4. **Use appropriate status codes**
   - `200 OK` - Successful GET, PUT, PATCH
   - `201 Created` - Successful POST that creates a resource
   - `204 No Content` - Successful DELETE
   - `400 Bad Request` - Validation errors
   - `401 Unauthorized` - Authentication required
   - `403 Forbidden` - Authenticated but not authorized
   - `404 Not Found` - Resource doesn't exist
   - `409 Conflict` - Duplicate resource (e.g., email already exists)
   - `500 Internal Server Error` - Unexpected server errors
