import { TaskNotFoundError } from '@application/errors/task-not-found.error';
import { GlobalExceptionFilter } from '@infrastructure/logging/global-exception.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

describe('GlobalExceptionFilter', () => {
  const logger = {
    error: jest.fn(),
    warn: jest.fn(),
  } as unknown as PinoLogger;

  const request = {
    id: 'request-123',
    method: 'PATCH',
    originalUrl: '/tasks/task-123?token=secret',
    url: '/tasks/task-123?token=secret',
  };

  const createHost = () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const host = {
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => response,
      }),
    } as unknown as ArgumentsHost;
    return { host, response };
  };

  let filter: GlobalExceptionFilter;

  beforeEach(() => {
    jest.clearAllMocks();
    filter = new GlobalExceptionFilter(logger);
  });

  it('should return 404 and log request context for a missing task', () => {
    const { host, response } = createHost();
    const exception = new TaskNotFoundError('task-123');

    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.NOT_FOUND,
        path: '/tasks/task-123',
        requestId: 'request-123',
        message: exception.message,
      }),
    );
    expect(logger.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        requestId: 'request-123',
        method: 'PATCH',
        path: '/tasks/task-123',
        statusCode: HttpStatus.NOT_FOUND,
      }),
      'Request failed',
    );
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('should log unexpected errors with stack context and hide details from the response', () => {
    const { host, response } = createHost();
    const exception = new Error('database connection details');

    filter.catch(exception, host);

    expect(logger.error).toHaveBeenCalledWith(
      expect.objectContaining({
        requestId: 'request-123',
        method: 'PATCH',
        path: '/tasks/task-123',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        err: exception,
      }),
      'Unhandled request exception',
    );
    expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Internal server error',
        path: '/tasks/task-123',
        requestId: 'request-123',
      }),
    );
  });

  it('should preserve client error status and validation messages', () => {
    const { host, response } = createHost();
    const exception = new HttpException({ message: ['name must be a string'] }, HttpStatus.BAD_REQUEST);

    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['name must be a string'],
      }),
    );
    expect(logger.warn).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });
});