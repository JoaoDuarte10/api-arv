import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadEnvs } from './config/load-envs';
import { configProviders } from './providers/config-provider';
import { Modules } from './modules/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvs],
    }),
    ...Modules,
  ],
  providers: [...configProviders],
})
export class AppModule {}
