import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '../../../exceptions/base-http';

export class RuleAlreadyExistsWithUser extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.CONFLICT;

    super(statusCode, 'RuleAlreadyExistsWithUser', message);
  }
}
