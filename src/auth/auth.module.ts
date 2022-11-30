import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../accounts/entities/account.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SECRET_KEY } from '../config/secret';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '600s' },
    }),
    TypeOrmModule.forFeature([Account]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
