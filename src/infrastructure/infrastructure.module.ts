import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HealthModule } from '@infrastructure/health/health.module';
import { EnvConfigModule } from '@shared/env/env-config.module';
import { DatabaseModule } from '@infrastructure/database/database.module';

@Module({
  imports: [HttpModule, HealthModule, EnvConfigModule, DatabaseModule],
  providers: [],
  exports: [HealthModule, DatabaseModule],
})
export class InfrastructureModule {}
