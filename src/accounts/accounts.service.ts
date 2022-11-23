import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import { Account } from './entities/account.entity';
import { EmailNotUniqueException } from './exceptions/email-not-unique.exception';
import { AccountUnauthorizedException } from './exceptions/unauthorized.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly authService: AuthService,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { email, password } = createAccountDto;

    const accountInDb = await this.accountRepository.findOneBy({ email });

    if (accountInDb) {
      throw new EmailNotUniqueException();
    }

    const account = new Account();
    account.email = email;
    account.password = password;

    return await this.accountRepository.save(account);
  }

  async findOne(id: number, req: Request): Promise<any> {
    const idInToken = req.user;
    // const account = await this.accountRepository.findOneBy({ id });

    const account = await this.accountRepository.findOne({
      where: {
        id: 1,
      },
      relations: {
        profile: true,
      },
    });

    if (id !== +idInToken || !account.isLoggin) {
      throw new UnauthorizedException();
    }

    if (!account) {
      throw new UserNotFoundException();
    }

    const { password, isLoggin, profile, ...accountInfo } = account;

    return {
      accountInfo,
      profile: account.profile,
    };
  }

  async login(loginAccountDto: LoginAccountDto): Promise<any> {
    const { email, password } = loginAccountDto;

    const account = await this.accountRepository.findOneBy({ email });
    if (!account) {
      throw new UserNotFoundException();
    }

    const isValidPassword = await account.checkPassword(password);
    if (!isValidPassword) {
      throw new AccountUnauthorizedException();
    }

    await this.accountRepository.update(account.id, { isLoggin: true });

    const payload = { id: account.id, email: account.email };

    return await this.authService.createJwtToken(payload);
  }

  async logout(id: number, req: Request): Promise<void> {
    const idInToken = req.user;
    const account = await this.accountRepository.findOneBy({ id });

    if (id !== +idInToken || !account.isLoggin) {
      throw new UnauthorizedException();
    }

    if (!account) {
      throw new UserNotFoundException();
    }

    await this.accountRepository.update(id, { isLoggin: false });
  }
}
