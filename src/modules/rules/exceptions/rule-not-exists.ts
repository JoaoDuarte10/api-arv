import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '../../../exceptions/base-http';

export class RuleNotExists extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.CONFLICT;

    super(statusCode, 'RuleNotExists', message);
  }
}
