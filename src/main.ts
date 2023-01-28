import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig } from './config/config';
import { description, version } from '../package.json';
import * as swStats from 'swagger-stats';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Api Arv')
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  app.use(swStats.getMiddleware({ swaggerSpec: document }));

  const { port } = app.get(AppConfig);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
