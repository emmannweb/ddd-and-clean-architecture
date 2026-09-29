import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { EnvConfigModule } from '@shared/env/env-config.module';
import { PresentationModule } from '@presentation/presentation.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

const modules = [ApplicationModule, EnvConfigModule, PresentationModule, InfrastructureModule];

@Module({
  imports: [...modules],
})
export class AppModule {}
