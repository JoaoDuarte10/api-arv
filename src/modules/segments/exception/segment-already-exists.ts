import { BaseHttpException } from '../../../exceptions/base';
import { HttpStatus } from '@nestjs/common';

export class SegmentAlreadyExistsException extends BaseHttpException {
  constructor(message: string) {
    const statusCode = HttpStatus.CONFLICT;

    super(statusCode, [
      {
        type: 'SegmentAlreadyExistsException',
        message,
      },
    ]);
  }
}
