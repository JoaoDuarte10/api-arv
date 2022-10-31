import { Env } from './env';
import { Config, ConfigTypes } from '../config/config';

const DEFAULT_PORT = 3000;

export function configMap(envs: Env): Config {
  return {
    [ConfigTypes.app]: {
      port: Number(envs.PORT) || DEFAULT_PORT,
    },
  };
}
