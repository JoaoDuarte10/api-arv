import { Env } from './env';
import { Config, ConfigTypes } from '../config/config';
import { name } from '../../package.json';

const DEFAULT_PORT = 3000;

export function configMap(envs: Env): Config {
  return {
    [ConfigTypes.app]: {
      port: Number(envs.PORT) || DEFAULT_PORT,
      environment: envs.ENVIRONMENT,
      consoleLogEnable: Boolean(envs.CONSOLE_LOG_ENABLE) || false,
    },
    [ConfigTypes.logger]: {
      host: envs.REDIS_HOST,
      port: envs.REDIS_PORT,
      container: envs.REDIS_CONTAINER || name,
      name: envs.REDIS_NAME || name,
    },
    [ConfigTypes.dbConfig]: {
      user: envs.PGUSER,
      host: envs.PGHOST,
      database: envs.PGDATABASE,
      password: envs.PGPASSWORD,
      port: Number(envs.PGPORT),
    },
  };
}
