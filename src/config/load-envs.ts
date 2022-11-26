import * as dotenv from 'dotenv';
import { configMap } from './config-map';
import { Config } from '../config/config';

const RELOAD_SCALE = 1e3;

export function loadEnvs(): Config {
  try {
    const variables = loadFromEnv();
    const config: Config = configMap(variables);
    const reloadTime = Number(variables.SETTINGS_RELOAD_TIME);
    if (reloadTime) {
      setTimeout(loadEnvs, reloadTime * RELOAD_SCALE);
    }
    return config;
  } catch (error) {
    console.log(error);
  }
}

function loadFromEnv() {
  dotenv.config();
  return process.env;
}
