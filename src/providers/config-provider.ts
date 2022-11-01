import { Provider } from '@nestjs/common';
import { AppConfig, ConfigTypes, DatabaseConfig } from '../config/config';
import { configGetter } from './config-getter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '../logger/logger';
import { loggerFactory } from '../logger/logger-factory';
import { database } from '../modules/clients/repository/db';

export const configProviders: Provider[] = [
  {
    provide: AppConfig,
    useFactory: configGetter(ConfigTypes.app),
    inject: [ConfigService],
  },
  {
    provide: Logger,
    useFactory: loggerFactory,
    inject: [AppConfig],
  },
  {
    provide: DatabaseConfig,
    useFactory: configGetter(ConfigTypes.dbConfig),
    inject: [ConfigService],
  },
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (databaseConfig: DatabaseConfig) => database(databaseConfig),
    inject: [DatabaseConfig],
  },
];
