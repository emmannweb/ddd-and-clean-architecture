import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Request, Response } from 'express';
import { TaskNotFoundError } from '@application/errors/task-not-found.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const statusCode = this.getStatusCode(exception);
    const requestId = typeof request.id === 'string' ? request.id : undefined;
    const path = (request.originalUrl ?? request.url ?? '').split('?')[0];
    const context = {
      requestId,
      method: request.method,
      path,
      statusCode,
    };

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      const error = exception instanceof Error ? exception : new Error(String(exception));
      this.logger.error({ ...context, err: error }, 'Unhandled request exception');
    } else {
      this.logger.warn(context, 'Request failed');
    }

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path,
      requestId,
      message: this.getMessage(exception, statusCode),
    });
  }

  private getStatusCode(exception: unknown): number {
    if (exception instanceof TaskNotFoundError) {
      return HttpStatus.NOT_FOUND;
    }
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: unknown, statusCode: number): string | string[] {
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      return 'Internal server error';
    }
    if (exception instanceof TaskNotFoundError) {
      return exception.message;
    }
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (typeof body === 'string') {
        return body;
      }
      if (typeof body === 'object' && body !== null && 'message' in body) {
        const message = body.message;
        if (typeof message === 'string' || Array.isArray(message)) {
          return message;
        }
      }
      return exception.message;
    }
    return exception instanceof Error ? exception.message : 'Request failed';
  }
}