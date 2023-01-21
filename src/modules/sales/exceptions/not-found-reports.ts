import { BaseHttpException } from '../../../exceptions/base-http';
import { HttpStatus } from '@nestjs/common';

export class NotFoundReportsException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.NOT_FOUND;

    super(statusCode, 'NotFoundReportsException', message);
  }
}
