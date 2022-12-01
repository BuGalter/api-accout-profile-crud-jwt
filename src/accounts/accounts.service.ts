import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { IAccountInfo } from '../interfaces/account-info.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import { Account } from './entities/account.entity';
import { EmailNotUniqueException } from './exceptions/email-not-unique.exception';
import { AccountUnauthorizedException } from './exceptions/unauthorized.exception';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly authService: AuthService,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<IAccountInfo> {
    const accountInDb = await this.accountRepository.findOneBy({
      email: createAccountDto.email,
    });

    if (accountInDb) {
      throw new EmailNotUniqueException();
    }

    const account = new Account();
    account.email = createAccountDto.email;
    account.password = createAccountDto.password;
    account.profile = null;

    await this.accountRepository.save(account);

    const { password, isLoggin, ...accountInfo } = account;

    return accountInfo;
  }

  async findOne(id: number, req: any): Promise<IAccountInfo> {
    const idInToken = req.user.accountId;

    await this.authService.validateId(idInToken, id);

    const account = await this.accountRepository.findOneBy({ id });

    await this.authService.validateAccount(account);
    await this.authService.isAccountLoggin(account.isLoggin);

    const { password, isLoggin, ...accountInfo } = account;

    return accountInfo;
  }

  async login(loginAccountDto: LoginAccountDto): Promise<any> {
    const { email, password } = loginAccountDto;

    const account = await this.accountRepository.findOneBy({ email });

    await this.authService.validateAccount(account);

    const isValidPassword = await account.checkPassword(password);
    if (!isValidPassword) {
      throw new AccountUnauthorizedException();
    }

    await this.accountRepository.update(account.id, { isLoggin: true });

    const payload = { id: account.id, email: account.email };

    return await this.authService.createJwtToken(payload);
  }

  async logout(id: number, req: any): Promise<any> {
    const idInToken = req.user.accountId;

    await this.authService.validateId(idInToken, id);

    const account = await this.accountRepository.findOneBy({ id });

    await this.authService.validateAccount(account);
    await this.authService.isAccountLoggin(account.isLoggin);

    await this.accountRepository.update(id, { isLoggin: false });

    return { id };
  }
}
