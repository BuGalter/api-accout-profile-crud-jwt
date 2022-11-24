import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Account } from '../accounts/entities/account.entity';
import { UserNotFoundException } from './exeptions/user-not-found.exception';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createJwtToken(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateId(idInToken: number, id: number): Promise<void> {
    if (id !== +idInToken) {
      throw new UnauthorizedException();
    }
  }

  async isAccountLoggin(isLoggin: boolean): Promise<void> {
    if (!isLoggin) {
      throw new UnauthorizedException();
    }
  }

  async validateAccount(account: Account): Promise<void> {
    if (!account) {
      throw new UserNotFoundException();
    }
  }
}
