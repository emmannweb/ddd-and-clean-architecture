import { DocumentBuilder } from '@nestjs/swagger';

export function addSwaggerTags(config: DocumentBuilder): DocumentBuilder {
  return config.addTag('Task', 'Crud task here');
}
