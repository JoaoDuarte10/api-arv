export enum ConfigTypes {
  app = 'app',
  logger = 'loggerTransport',
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

export interface Config {
  [ConfigTypes.app]: AppConfig;
  [ConfigTypes.logger]: LoggerTransport;
}
