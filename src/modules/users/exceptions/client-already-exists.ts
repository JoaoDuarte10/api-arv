import { BaseHttpException } from '../../../exceptions/base';
import { HttpStatus } from '@nestjs/common';

export class ClientAlreadyExistsException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.CONFLICT;

    super(statusCode, [
      {
        type: 'ClientAlreadyExistsException',
        message,
      },
    ]);
  }
}
