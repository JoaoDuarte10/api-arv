import { Provider } from '@nestjs/common';
import { AppConfig, ConfigTypes } from '../config/config';
import { configGetter } from './config-getter';
import { ConfigService } from '@nestjs/config';

export const configProviders: Provider[] = [
  {
    provide: AppConfig,
    useFactory: configGetter(ConfigTypes.app),
    inject: [ConfigService],
  },
];
