import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = app.get(AppConfig);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
