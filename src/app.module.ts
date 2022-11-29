import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadEnvs } from './config/load-envs';
import { configProviders } from './providers/config-provider';
import { Modules } from './modules/index';
import { HealthCheckController } from './controllers/health-check';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvs],
    }),
    ...Modules,
    RouterModule.register([
      ...Modules.map((module) => {
        return {
          path: 'api',
          module,
        };
      }),
    ]),
  ],
  controllers: [HealthCheckController],
  providers: [...configProviders],
})
export class AppModule {}
