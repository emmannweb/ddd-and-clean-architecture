import { Module } from '@nestjs/common';
import use_cases from '@application/use-cases/export-all.use-cases';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [...use_cases],
  exports: [...use_cases],
})
export class ApplicationModule {}
