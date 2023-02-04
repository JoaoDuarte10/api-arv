import { BaseHttpException } from './base-http';
import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends BaseHttpException {
  constructor(message: string, details?: any[]) {
    super(
      HttpStatus.NOT_FOUND,
      'InvalidParamsRequestException',
      message,
      details,
    );
  }
}
