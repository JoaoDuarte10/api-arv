import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadEnvs } from './config/load-envs';
import { configProviders } from './providers/config-provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvs],
    }),
  ],
  controllers: [],
  providers: [...configProviders],
})
export class AppModule {}
