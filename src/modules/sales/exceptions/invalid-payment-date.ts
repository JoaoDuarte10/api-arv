import { BaseHttpException } from '../../../exceptions/base';
import { HttpStatus } from '@nestjs/common';

export class InvalidPaymentDateException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.BAD_REQUEST;

    super(statusCode, [
      {
        type: 'InvalidPaymentDateException',
        message,
      },
    ]);
  }
}
