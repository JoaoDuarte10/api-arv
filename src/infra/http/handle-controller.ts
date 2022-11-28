import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '../../exceptions/base-http';

type CallbackFunction = () => Promise<any> | any;

export async function handleController(fn: CallbackFunction) {
  try {
    return await fn();
  } catch (error) {
    validateError(error);
  }
}

function validateError(error: Error | BaseHttpException) {
  if (error instanceof Error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  } else {
    throw new HttpException(
      {
        type: error.getType(),
        message: error.getMessage(),
        details: error.getDetails(),
      },
      error.getStatusCode(),
    );
  }
}
