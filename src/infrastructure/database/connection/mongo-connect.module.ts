import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule } from '@shared/env/env-config.module';
import { EnvConfigService } from '@shared/env/services/env-config.service';

@Module({
  imports: [
    EnvConfigModule,
    MongooseModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (env: EnvConfigService) => ({
        uri: env.getMongoUri(),
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class ConnectionModule {}
