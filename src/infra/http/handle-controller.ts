import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '../../exceptions/base-http';
import api from '@opentelemetry/api';

type CallbackFunction = () => Promise<any> | any;

export async function handleController(fn: CallbackFunction) {
  try {
    return await fn();
  } catch (error) {
    validateError(error);
  }
}

function validateError(error: Error | BaseHttpException) {
  const span = api.trace.getActiveSpan();

  const traceId = api.trace.getSpanContext(api.context.active()).traceId;

  if (error instanceof Error) {
    const response = { message: error.message, traceId };
    span?.setAttribute(
      'http.response_body_error',
      JSON.stringify(response) || '',
    );

    throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
  } else {
    const httpExceptionParams = {
      type: error.getType(),
      message: error.getMessage(),
      details: error.getDetails(),
      traceId,
    };
    span?.setAttribute(
      'http.response_body_error',
      JSON.stringify(httpExceptionParams),
    );

    throw new HttpException(httpExceptionParams, error.getStatusCode());
  }
}
