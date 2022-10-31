type LeveledLogMethod = (message: string) => Logger;

export abstract class Logger {
  abstract error: LeveledLogMethod;
  abstract warn: LeveledLogMethod;
  abstract info: LeveledLogMethod;
  abstract http: LeveledLogMethod;
  abstract verbose: LeveledLogMethod;
  abstract debug: LeveledLogMethod;
  abstract silly: LeveledLogMethod;
}
