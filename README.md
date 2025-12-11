# Node.js + TypeScript + Express API

A modern, well-structured Node.js REST API built with TypeScript, Express, MongoDB, and Zod validation. This project follows best practices with a clean architecture pattern separating concerns into routes, controllers, services, and models.

## 🚀 Features

- **TypeScript** - Type-safe development with strict mode enabled
- **Express.js** - Fast, unopinionated web framework
- **MongoDB + Mongoose** - NoSQL database with elegant ODM
- **Zod** - Schema validation for request data
- **Clean Architecture** - Organized folder structure with separation of concerns
- **Error Handling** - Centralized error handling middleware
- **Request Logging** - Custom logger middleware for debugging
- **Environment Variables** - Secure configuration with dotenv
- **Hot Reload** - Development server with ts-node-dev

## 📁 Project Structure

```
src/
├── config/           # Configuration files (database, etc.)
├── controllers/      # Request handlers
├── middlewares/      # Custom middleware (validation, logging, error handling)
├── models/          # Mongoose schemas and models
├── routes/          # API route definitions
├── schemas/         # Zod validation schemas
├── services/        # Business logic layer
├── utils/           # Utility functions and helpers
│   ├── constants/   # Application constants
│   ├── handlers/    # Response handlers
│   └── helpers/     # Helper functions
└── server.ts        # Application entry point
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Package Manager**: pnpm
- **Dev Tools**: ts-node-dev

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## 🚦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Shohzodt/todo-app.git
cd todo-app
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/your-database-name

# Add other environment variables as needed
```

### 4. Run the development server

```bash
pnpm dev
```

The server will start at `http://localhost:8000/`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm start` | Run production build |

## 🔌 API Endpoints

### Base URL
```
http://localhost:8000
```

### Task Routes
```
GET    /tasks              # Get all tasks
POST   /tasks              # Create new task
GET    /tasks/:id          # Get task by ID
PUT    /tasks/:id          # Update task
DELETE /tasks/:id          # Delete task
PATCH  /tasks/:id/toggle   # Toggle task completion status
```

#### Example Request Bodies

**Create Task (POST /tasks)**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "completed": false
}
```

**Update Task (PUT /tasks/:id)**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "completed": true
}
```

## 🏗️ Architecture

This project follows a **layered architecture** pattern:

1. **Routes** - Define API endpoints and map them to controllers
2. **Controllers** - Handle HTTP requests and responses
3. **Services** - Contain business logic
4. **Models** - Define data structure and database interaction
5. **Middlewares** - Handle cross-cutting concerns (validation, logging, errors)
6. **Schemas** - Validate incoming request data with Zod

### Request Flow
```
Request → Routes → Middleware (Validation) → Controller → Service → Model → Database
                                                    ↓
Response ← Error Handler ← Controller ← Service ← Model ← Database
```

## 🔐 Validation

Request validation is handled using **Zod schemas** with a custom validation middleware:

```typescript
// Example: Validating task creation
app.post('/tasks', validate(createTaskSchema), taskController.createTask);
```

## 🐛 Error Handling

Centralized error handling ensures consistent error responses across the API:

- Custom error middleware catches all errors
- Zod validation errors are formatted for client consumption
- Unexpected errors are logged and return generic messages

## 🔧 Development

### Code Style
- Strict TypeScript configuration
- Consistent error handling patterns
- Separation of concerns

### Adding New Features

1. **Create Model** - Define Mongoose schema in `models/`
2. **Create Schema** - Define Zod validation in `schemas/`
3. **Create Service** - Add business logic in `services/`
4. **Create Controller** - Handle requests in `controllers/`
5. **Create Routes** - Define endpoints in `routes/`
6. **Register Routes** - Import in `server.ts`

## 🚀 Production Deployment

### Build the project
```bash
pnpm build
```

### Start production server
```bash
pnpm start
```

### Environment Variables
Make sure to set all required environment variables in your production environment.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Shohzod Tursunov**
- Email:
- GitHub: [@Shohzodt](https://github.com/Shohzodt)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Zod Documentation](https://zod.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Happy Coding! 🎉**
