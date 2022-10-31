import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadEnvs } from './config/load-envs';
import { configProviders } from './providers/config-provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvs],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...configProviders],
})
export class AppModule {}
