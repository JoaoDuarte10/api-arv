import { ExceptionDetailsType } from './exception';

export class BaseHttpException {
  constructor(
    private readonly statusCode: number,
    private readonly type: string,
    private readonly message: string,
    private readonly details?: ExceptionDetailsType[],
  ) {}

  getStatusCode(): number {
    return this.statusCode;
  }

  getType(): string {
    return this.type;
  }

  getMessage(): string {
    return this.message;
  }

  getDetails(): ExceptionDetailsType[] {
    return this.details;
  }
}
