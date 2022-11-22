import { HttpException, HttpStatus } from '@nestjs/common';

export class Unauthorized extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Input data validation failed',
        user: 'Wrong password.',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
