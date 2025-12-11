# Validation Strategy

## Overview
This project uses a **two-layer validation approach** with clear separation of concerns:
- **Zod** handles API request validation
- **Mongoose** handles database constraints

## Validation Layers

### Layer 1: API Validation (Zod)
**Location:** `/src/schemas/*.schema.ts`

**Responsibilities:**
- ✅ Validate request format (body, params, query)
- ✅ Type checking (string, number, email, etc.)
- ✅ Length constraints (min, max)
- ✅ Format validation (email, URL, phone)
- ✅ Business rules (age > 18, price > 0)
- ✅ Data transformations (trim, lowercase)
- ✅ Custom validation logic

**Example:**
```typescript
export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).trim(),
    email: z.string().email().toLowerCase().trim(),
  }),
});
```

### Layer 2: Database Constraints (Mongoose)
**Location:** `/src/models/*.model.ts`

**Responsibilities:**
- ✅ Unique constraints (prevent duplicates)
- ✅ Indexes (for query performance)
- ✅ Basic required flags (data integrity)
- ✅ Timestamps (createdAt, updatedAt)
- ✅ References (foreign keys)
- ✅ Default values

**Example:**
```typescript
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Database constraint
    index: true,   // Performance optimization
  },
});
```

## Why This Approach?

### ✅ Advantages
1. **Single Source of Truth** - Validation logic lives in Zod schemas
2. **Better Error Messages** - Zod provides detailed, user-friendly errors
3. **Early Rejection** - Invalid requests caught before hitting database
4. **Cleaner Models** - Mongoose schemas focus on data structure
5. **Easier Testing** - Validation logic is isolated and testable
6. **Type Safety** - Zod schemas generate TypeScript types

### 📋 What Goes Where

| Validation Type | Zod | Mongoose |
|----------------|-----|----------|
| Required fields | ✅ | ✅ (basic) |
| Min/Max length | ✅ | ❌ |
| Email format | ✅ | ❌ |
| Trim/Lowercase | ✅ | ❌ |
| Unique constraint | ❌ | ✅ |
| Indexes | ❌ | ✅ |
| Custom messages | ✅ | ❌ |
| Business rules | ✅ | ❌ |

## Request Flow

```
1. Client sends request
   ↓
2. Zod middleware validates (schemas/*.schema.ts)
   ├─ Invalid → Return 400 with detailed errors
   └─ Valid → Continue
   ↓
3. Controller processes request
   ↓
4. Service layer interacts with database
   ↓
5. Mongoose enforces constraints (models/*.model.ts)
   ├─ Duplicate → MongoDB error (caught by error handler)
   └─ Valid → Save to database
   ↓
6. Return response
```

## Example: Creating a User

### Zod Schema (`/src/schemas/user.schema.ts`)
```typescript
export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: 'Name is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .trim(),
    email: z
      .string({ message: 'Email is required' })
      .email('Invalid email format')
      .toLowerCase()
      .trim(),
  }),
});
```

### Mongoose Model (`/src/models/user.model.ts`)
```typescript
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Only database-level constraint
    index: true,
  },
});
```

## Best Practices

### ✅ Do
- Keep Zod schemas comprehensive with all validation rules
- Keep Mongoose schemas minimal with only DB constraints
- Use Zod for transformations (trim, lowercase)
- Use Mongoose for uniqueness and indexes
- Document why each constraint exists

### ❌ Don't
- Duplicate validation logic in both layers
- Put business rules in Mongoose schemas
- Put unique constraints in Zod schemas
- Remove `required: true` from Mongoose (keeps data integrity)

## Adding New Validations

### For API Validation (Most Common)
Add to Zod schema:
```typescript
// src/schemas/user.schema.ts
age: z.number().min(18, 'Must be 18 or older')
```

### For Database Constraint
Add to Mongoose model:
```typescript
// src/models/user.model.ts
username: {
  type: String,
  required: true,
  unique: true,  // Prevent duplicates at DB level
  index: true,
}
```

## Testing Strategy

### Zod Validation Tests
Test at the API level:
```bash
# Missing field
curl -X POST /users -d '{}' 
# Expected: 400 with "Name is required"

# Invalid format
curl -X POST /users -d '{"name": "A", "email": "invalid"}'
# Expected: 400 with validation errors
```

### Mongoose Constraint Tests
Test duplicate handling:
```bash
# Create user
curl -X POST /users -d '{"name": "John", "email": "john@example.com"}'
# Expected: 200 OK

# Try duplicate email
curl -X POST /users -d '{"name": "Jane", "email": "john@example.com"}'
# Expected: 409 Conflict - "Email already exists"
```

## Summary

**Zod = Validation Logic** (comprehensive, user-facing)  
**Mongoose = Database Constraints** (minimal, data integrity)

This separation keeps your codebase clean, maintainable, and follows industry best practices! 🎯
