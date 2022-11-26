import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from 'src/exceptions/base';

export class ClientAlreadyExistsException extends BaseHttpException {
  constructor(readonly message: string) {
    const statusCode = HttpStatus.CONFLICT;

    super(statusCode, [
      {
        type: 'ClientAlreadyExistsException',
        message,
      },
    ]);
  }
}
