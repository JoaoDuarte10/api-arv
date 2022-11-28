import { BaseHttpException } from '../../../exceptions/base-http';
import { HttpStatus } from '@nestjs/common';

export class SegmentNotEmptyException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.CONFLICT;

    super(statusCode, 'SegmentNotEmptyException', message);
  }
}
