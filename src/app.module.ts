import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadEnvs } from './config/load-envs';
import { configProviders } from './providers/config-provider';
import { Modules } from './modules/index';
import { HealthCheckController } from './controllers/health-check';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigTypes, DatabaseConfig } from './config/config';
import { entities } from './config/database-entities';

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
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const databaseConfig = config.get<DatabaseConfig>(ConfigTypes.dbConfig);

        return {
          type: 'postgres',
          timezone: '+00:00',
          autoLoadEntities: true,
          entities: [...entities],
          synchronize: false,
          ...databaseConfig,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [HealthCheckController],
  providers: [...configProviders],
})
export class AppModule {}
