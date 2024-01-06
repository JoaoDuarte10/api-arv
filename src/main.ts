import './config/instrumentation';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig } from './config/config';
import { description, version } from '../package.json';
import * as swStats from 'swagger-stats';
import { Logger } from './logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Api Arv')
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);
  app.enableCors();
  app.use(swStats.getMiddleware({ swaggerSpec: document }));

  const { port } = app.get(AppConfig);
  await app.listen(port, '0.0.0.0');

  const logger = app.get(Logger);
  logger.info(`Application running on port: ${port}`);
}
bootstrap();
