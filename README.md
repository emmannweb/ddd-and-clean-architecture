# NestJS DDD and Clean Architecture Example

A NestJS task API organized into application, domain, infrastructure, presentation, and shared layers. It uses MongoDB through Mongoose, validates requests with NestJS's global `ValidationPipe`, and
publishes OpenAPI documentation through Swagger.

## Requirements

- Node.js and npm
- A reachable MongoDB instance

## Setup

Install dependencies:

```bash
npm install
```

The application loads environment variables from a root `.env` file. Both settings below are optional:

```env
MONGODB_URI=mongodb://localhost:27017/tasknew
PORT=3000
LOG_LEVEL=info
```

`MONGODB_URI` currently defaults to `mongodb://localhost:27017/tasknew`; `PORT` defaults to `3000`. `LOG_LEVEL` is optional and defaults to `debug` outside production and `info` in production. Set
`MONGODB_URI` explicitly in production: the current configuration does not reject a missing value and will still fall back to localhost.

HTTP access logs are written to stdout with the request ID, method, path, status, and response duration. Development logs are formatted for readability; production logs are structured JSON. The
`X-Request-Id` header is validated if supplied, otherwise a UUID is generated and returned in the response header. Request headers and query-string values are omitted from access logs. Unhandled
server errors are logged with their stack and request context; client responses receive a consistent error body without internal server details.

Start in development mode:

```bash
npm run start:dev
```

Build and start the compiled application:

```bash
npm run build
npm run start:prod
```

Swagger UI is available at `http://localhost:3000/api`. Use the configured `PORT` if it differs from `3000`.

## API

### Tasks

| Method  | Route        | Status | Description           |
| ------- | ------------ | ------ | --------------------- |
| `POST`  | `/tasks`     | `201`  | Create a task         |
| `GET`   | `/tasks`     | `200`  | List tasks            |
| `PATCH` | `/tasks/:id` | `200`  | Partially update task |

`GET /tasks` accepts these pagination query parameters:

| Parameter    | Default | Description                       |
| ------------ | ------- | --------------------------------- |
| `pageNumber` | `1`     | Page number                       |
| `pageSize`   | `10`    | Maximum number of tasks to return |

The list response contains `items`, `pageNumber`, `pageSize`, `totalPages`, and `totalRecords`.

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

PATCH accepts a partial task body. For example:

```json
{
  "description": "Update the release checklist"
}
```

### Health

`GET /health` checks the MongoDB connection and outbound connectivity to `https://docs.nestjs.com`; both checks must pass for the health check to report success.

## Project Structure

```text
src/
  app.module.ts                 # Root module and feature-module wiring
  main.ts                       # Bootstrap, validation, Swagger, and HTTP port
  application/
    commands/                   # Use-case input commands
    errors/                     # Application errors
    mappers/                    # Domain and DTO mapping
    use-cases/                  # Task workflows
  domain/
    entities/                   # Task entity and task-list value object
    repositories/               # Task repository contract
    tokens/                     # Repository injection token
  infrastructure/
    database/                   # MongoDB connection, schemas, persistence, and mappers
    documentation/              # Swagger configuration
    health/                     # Health endpoint and checks
    logging/                    # Global HTTP exception filter
  presentation/
    controllers/                # HTTP task controller
  shared/
    dtos/                       # Request and response DTOs
    env/                        # Environment configuration
    pagination/                 # Paginated response DTO
test/
  unit/application/task/        # Task use-case unit tests
  app.e2e-spec.ts               # End-to-end test
```

The domain owns the repository contract. Infrastructure provides its Mongoose implementation; application use cases depend on that contract through a NestJS injection token; presentation controllers
map HTTP requests to application commands. `ApplicationModule` imports `InfrastructureModule` to make the repository provider available to the use cases.

## Tests and Scripts

| Command               | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `npm test`            | Run unit tests                            |
| `npm run test:watch`  | Run unit tests in watch mode              |
| `npm run test:cov`    | Run unit tests and generate coverage      |
| `npm run test:e2e`    | Run the Jest end-to-end suite             |
| `npm run build`       | Compile the application                   |
| `npm run start`       | Start the application                     |
| `npm run start:dev`   | Start with watch mode                     |
| `npm run start:debug` | Start with the debugger and watch mode    |
| `npm run start:prod`  | Run the compiled application from `dist/` |
| `npm run lint`        | Run ESLint with automatic fixes           |
| `npm run format`      | Format TypeScript source and test files   |

The current e2e spec still checks the NestJS starter `GET /` response (`Hello World!`), but the application does not register a root route. Update that assertion to an implemented route before relying
on `npm run test:e2e` as a passing check.
