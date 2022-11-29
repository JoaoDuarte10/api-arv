import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '../../../exceptions/base-http';

export class ClientNotExistsException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.NOT_FOUND;

    super(statusCode, 'ClientNotExistsException', message);
  }
}
