import { BaseEntityException } from '../../../../exceptions/entity';

export class InvalidParamsEntityException extends BaseEntityException {
  constructor(message: string, details?: any[]) {
    const exceptionDetails = [];
    if (details) exceptionDetails.push(details);
    super('InvalidParamsEntityException', message, exceptionDetails);
  }
}
