export class BaseHttpException {
  constructor(
    private readonly statusCode: number,
    private readonly details: ErrorType[],
  ) {}

  getStatusCode(): number {
    return this.statusCode;
  }

  getDetails(): ErrorType[] {
    return this.details;
  }
}

export type ErrorType = {
  type: string;
  message: string;
};
