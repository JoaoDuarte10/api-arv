export enum ConfigTypes {
  app = 'app',
  logger = 'loggerTransport',
  dbConfig = 'dbConfig',
}

export abstract class AppConfig {
  abstract port: number;
  abstract environment: string;
  abstract consoleLogEnable: boolean;
}

export abstract class LoggerTransport {
  host: string;
  port: string;
  container: string;
  name: string;
}

export abstract class DatabaseConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export interface Config {
  [ConfigTypes.app]: AppConfig;
  [ConfigTypes.logger]: LoggerTransport;
  [ConfigTypes.dbConfig]: DatabaseConfig;
}
