import HTTP_STATUS from 'http-status-codes';

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      statusCode: this.statusCode,
      message: this.message,
      status: this.status
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode: number = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode: number = HTTP_STATUS.NOT_FOUND;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}


export class JoiRequestValidationError extends CustomError {
  statusCode: number = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    console.error(message);
    super(message);
  }
}

export class ServerError extends CustomError {
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}