import { BaseHttpException } from './base-http';
import { HttpStatus } from '@nestjs/common';

export class InvalidParamsRequestException extends BaseHttpException {
  constructor(message: string, details?: any[]) {
    super(
      HttpStatus.BAD_REQUEST,
      'InvalidParamsRequestException',
      message,
      details,
    );
  }
}
