import { Provider } from '@nestjs/common';
import { AppConfig, ConfigTypes } from '../config/config';
import { configGetter } from './config-getter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '../logger/logger';
import { loggerFactory } from '../logger/logger-factory';

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
];
