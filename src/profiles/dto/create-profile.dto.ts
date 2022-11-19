import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ description: 'User name', nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'User phone number', nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ description: 'User address', nullable: false })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Info about user', nullable: false })
  @IsNotEmpty()
  @IsString()
  userInfo: string;
}
