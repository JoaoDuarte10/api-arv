export enum ConfigTypes {
  app = 'app',
}

export abstract class AppConfig {
  abstract port: number;
}

export interface Config {
  [ConfigTypes.app]: AppConfig;
}
