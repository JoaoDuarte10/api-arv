import { BaseHttpException } from '../../../exceptions/base-http';
import { HttpStatus } from '@nestjs/common';

export class ClientAlreadyExistsException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.CONFLICT;

    super(statusCode, 'ClientAlreadyExistsException', message);
  }
}
