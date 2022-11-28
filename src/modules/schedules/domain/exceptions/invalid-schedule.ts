import { BaseEntityException } from '../../../../exceptions/entity';

export class InvalidScheduleException extends BaseEntityException {
  constructor(message: string, details: any[]) {
    super('InvalidScheduleException', message, details);
  }
}
