import { BaseHttpException } from '../../../exceptions/base';
import { HttpStatus } from '@nestjs/common';

export class SalesNotExistsException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.NOT_FOUND;

    super(statusCode, [
      {
        type: 'SalesNotExistsException',
        message,
      },
    ]);
  }
}
