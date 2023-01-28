import { BaseEntityException } from '../../../../exceptions/entity';

export class InvalidOutgoingException extends BaseEntityException {
  constructor(message: string, details: any[]) {
    super('InvalidOutgoingException', message, details);
  }
}
