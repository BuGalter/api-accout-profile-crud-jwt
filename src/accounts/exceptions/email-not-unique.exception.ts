import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailNotUniqueException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Input data validation failed',
        email: 'Email must be unique.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
