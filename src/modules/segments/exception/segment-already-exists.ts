import { BaseHttpException } from '../../../exceptions/base-http';
import { HttpStatus } from '@nestjs/common';

export class SegmentAlreadyExistsException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.CONFLICT;

    super(statusCode, 'SegmentAlreadyExistsException', message);
  }
}
