import * as dotenv from 'dotenv';
import { configMap } from './config-map';
import { Config } from '../config/config';
import { Env } from './env';
import * as Consul from 'consul';
import { ConsulClient } from './consul-client';
import { name as applicationName } from 'package.json';

const RELOAD_SCALE = 1e3;

export async function loadEnvs(): Promise<Config> {
  try {
    const consulUrl = process.env.CONSUL_URI;

    const variables = consulUrl ? await loadFromConsul() : loadFromEnv();
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

async function loadFromConsul(): Promise<Env> {
  const host = process.env.CONSUL_URI;
  const port = process.env.CONSUL_PORT;
  const token = process.env.CONSUL_TOKEN;

  const consul = new Consul({
    host,
    port,
    defaults: {
      token,
    },
  });
  const consulClient = new ConsulClient(consul);

  return await consulClient.fetchVariables(applicationName);
}

function loadFromEnv() {
  dotenv.config();
  return process.env;
}
