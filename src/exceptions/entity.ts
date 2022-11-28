import { ExceptionDetailsType } from './exception';

export class BaseEntityException {
  constructor(
    private readonly type: string,
    private readonly message: string,
    private readonly details: ExceptionDetailsType[],
  ) {}

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
