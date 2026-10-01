import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApplicationModule } from '@application/application.module';
import { EnvConfigModule } from '@shared/env/env-config.module';
import { PresentationModule } from '@presentation/presentation.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { GlobalExceptionFilter } from '@infrastructure/logging/global-exception.filter';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';

const modules = [ApplicationModule, EnvConfigModule, PresentationModule, InfrastructureModule];

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
        ...(process.env.NODE_ENV !== 'production' && {
          transport: {
            target: 'pino-pretty',
            options: { colorize: true, singleLine: true, translateTime: 'SYS:standard' },
          },
        }),
        genReqId: (request, response) => {
          const incomingId = request.headers['x-request-id'];
          const requestId = typeof incomingId === 'string' && /^[a-zA-Z0-9._-]{1,128}$/.test(incomingId) ? incomingId : randomUUID();
          response.setHeader('x-request-id', requestId);
          return requestId;
        },
        serializers: {
          req: request => ({
            id: request.id,
            method: request.method,
            url: request.url?.split('?')[0],
          }),
          res: response => ({ statusCode: response.statusCode }),
        },
      },
    }),
    ...modules,
  ],
  providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
