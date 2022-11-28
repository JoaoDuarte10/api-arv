import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '../../../exceptions/base-http';

export class ClientAlreadyExistsException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.CONFLICT;

    super(statusCode, 'ClientAlreadyExistsException', message);
  }
}
