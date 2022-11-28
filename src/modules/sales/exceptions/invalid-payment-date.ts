import { BaseHttpException } from '../../../exceptions/base-http';
import { HttpStatus } from '@nestjs/common';

export class InvalidPaymentDateException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.BAD_REQUEST;

    super(statusCode, 'InvalidPaymentDateException', message);
  }
}
