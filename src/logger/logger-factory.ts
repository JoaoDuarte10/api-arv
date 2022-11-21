import { createLogger, format, transports } from 'winston';
import { Logger } from './logger';
import { AppConfig } from '../config/config';
import * as winston from 'winston';

export function loggerFactory(appConfig: AppConfig): Logger {
  const { combine, timestamp, printf } = format;

  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  };

  const customFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} | ${level}: ${message}`;
  });

  const Logger = createLogger({
    levels: levels,
    transports: [
      new transports.File({
        filename: 'logs/app.log',
      }),
    ],
  });

  if (appConfig.consoleLogEnable) {
    Logger.add(
      new winston.transports.Console({
        format: combine(
          format.colorize(),
          format.splat(),
          format.simple(),
          timestamp(),
          customFormat,
        ),
      }),
    );
  }

  return Logger;
}
