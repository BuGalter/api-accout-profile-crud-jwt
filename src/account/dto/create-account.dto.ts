import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ description: 'User email as loggin', nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsEmail({ message: 'Must be email!' })
  readonly email: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: 'The password must be at least 6 symbols!' })
  readonly password: string;
}
