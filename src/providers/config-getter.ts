import { ConfigTypes } from '../config/config';
import { ConfigService } from '@nestjs/config';

export function configGetter<T>(configType: ConfigTypes) {
  return (config: ConfigService): T => config.get(configType);
}
