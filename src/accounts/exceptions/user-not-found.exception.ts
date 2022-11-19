import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Input data validation failed',
        user: 'Does not exist.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
