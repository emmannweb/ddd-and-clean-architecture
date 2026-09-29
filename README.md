# NestJS DDD and Clean Architecture Example

A NestJS task API organized into application, domain, infrastructure, presentation, and shared source areas. It uses MongoDB through Mongoose and publishes an OpenAPI/Swagger interface.

## Requirements

- Node.js and npm
- MongoDB, local or hosted

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root if you need to configure MongoDB or the listening port:

```env
MONGODB_URI=mongodb://localhost:27017/tasknew
PORT=3000
```

Both values are optional. The application defaults to `mongodb://localhost:27017/tasknew` and port `3000`.

Start the API in development mode:

```bash
npm run start:dev
```

Build and run the compiled application:

```bash
npm run build
npm run start:prod
```

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api
```

Replace `3000` with the configured `PORT` when using a different port.

## API Routes

### Tasks

| Method  | Route        | Description                                   |
| ------- | ------------ | --------------------------------------------- |
| `POST`  | `/tasks`     | Create a task                                 |
| `GET`   | `/tasks`     | List tasks, optionally filtered and paginated |
| `PATCH` | `/tasks/:id` | Partially update a task                       |

`GET /tasks` accepts these query parameters:

| Parameter | Default | Description                       |
| --------- | ------- | --------------------------------- |
| `page`    | `1`     | Page number                       |
| `limit`   | `10`    | Maximum number of tasks to return |
| `id`      | empty   | Optional task ID filter           |

Example create request:

```json
{
  "name": "Prepare release",
  "description": "Complete the release checklist",
  "list": [
    {
      "assignName": "Alex",
      "function": "Review changes"
    }
  ]
}
```

PATCH accepts any subset of the task fields. For example:

```json
{
  "description": "Update the release checklist"
}
```

### Health

| Method | Route     | Description                                                      |
| ------ | --------- | ---------------------------------------------------------------- |
| `GET`  | `/health` | Checks MongoDB and connectivity to the NestJS documentation site |

The health route requires the configured MongoDB connection and outbound connectivity to `https://docs.nestjs.com`.

## Project Structure

```text
src/
  app.module.ts                 # Root NestJS module
  main.ts                       # Application bootstrap, validation pipe, Swagger, and port
  application/
    commands/                   # Use-case input commands
    mappers/                    # Request/command and domain mapping
    use-cases/                  # Task application workflows
  domain/
    entities/                   # Task entity and task-list value object
    repositories/                # Task repository contract
    tokens/                      # Dependency injection token for the repository
  infrastructure/
    database/
      connection/                # MongoDB connection setup
      mappers/                   # Domain-to-Mongo persistence mapping
      persistence/               # Mongoose repository implementation
      schemas/                   # Mongoose schemas
    documentation/               # Swagger configuration
    health/                      # Health endpoint and module
  presentation/
    controllers/                 # HTTP task controller
  shared/
    dtos/                        # Request DTOs and validation decorators
    env/                         # Environment configuration
    interfaces/                  # Shared configuration interfaces

test/
  app.e2e-spec.ts                # End-to-end test
```

## Architecture Notes

- The domain defines the task repository contract and injection token.
- The infrastructure layer implements that contract with Mongoose and maps between domain entities and persistence documents.
- Application use cases coordinate task operations through the repository contract.
- Presentation controllers expose the use cases as HTTP routes.
- Current NestJS wiring is configured through modules: `ApplicationModule` imports `InfrastructureModule` so the use cases can resolve the task repository provider.

## Useful Scripts

| Command               | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `npm run build`       | Compile the application                   |
| `npm run start`       | Start the application                     |
| `npm run start:dev`   | Start with watch mode                     |
| `npm run start:debug` | Start with the debugger and watch mode    |
| `npm run start:prod`  | Run the compiled application from `dist/` |
| `npm test`            | Run Jest unit tests                       |
| `npm run test:e2e`    | Run the Jest end-to-end suite             |
| `npm run test:cov`    | Run tests and generate coverage           |
| `npm run lint`        | Run ESLint (configured with auto-fix)     |
| `npm run format`      | Format TypeScript source and test files   |
