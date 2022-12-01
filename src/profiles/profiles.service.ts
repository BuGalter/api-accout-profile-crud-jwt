import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../accounts/entities/account.entity';
import { AuthService } from '../auth/auth.service';
import { IAccountInfo } from '../interfaces/account-info.interface';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly authService: AuthService,
  ) {}

  async create(
    createProfileDto: CreateProfileDto,
    req: any,
  ): Promise<IAccountInfo> {
    const id = req.user.accountId;

    const { name, phoneNumber, address, userInfo } = createProfileDto;

    const account = await this.accountRepository.findOneBy({ id });

    await this.authService.validateAccount(account);
    await this.authService.isAccountLoggin(account.isLoggin);

    if (account.profile) {
      throw new BadGatewayException();
    }

    const profile = new Profile();
    profile.name = name;
    profile.phoneNumber = phoneNumber;
    profile.address = address;
    profile.userInfo = userInfo;

    await this.profileRepository.save(profile);

    account.profile = profile;

    await this.accountRepository.save(account);

    const { password, isLoggin, ...accountInfo } = account;

    return accountInfo;
  }

  async findOne(accountId: number, req: any): Promise<IAccountInfo> {
    const idInToken = req.user.accountId;

    await this.authService.validateId(idInToken, accountId);

    const account = await this.accountRepository.findOneBy({ id: accountId });

    if (!account.profile) {
      throw new NotFoundException();
    }

    await this.authService.isAccountLoggin(account.isLoggin);

    const { password, isLoggin, ...accountInfo } = account;

    return accountInfo;
  }

  async update(
    accountId: number,
    updateProfileDto: UpdateProfileDto,
    req: any,
  ): Promise<IAccountInfo> {
    const id = accountId;

    const idInToken = req.user.accountId;

    await this.authService.validateId(idInToken, id);

    const account = await this.accountRepository.findOneBy({ id });

    if (!account.profile) {
      throw new NotFoundException();
    }

    await this.authService.isAccountLoggin(account.isLoggin);

    const profile = Object.assign(account.profile, updateProfileDto);

    await this.profileRepository.save(profile);

    account.profile = profile;

    await this.accountRepository.save(account);

    const { password, isLoggin, ...accountInfo } = account;

    return accountInfo;
  }

  async remove(accountId: number, req: any): Promise<any> {
    const id = accountId;

    const idInToken = req.user.accountId;

    await this.authService.validateId(idInToken, id);

    const account = await this.accountRepository.findOneBy({ id });

    if (!account.profile) {
      throw new NotFoundException();
    }

    await this.authService.isAccountLoggin(account.isLoggin);

    const profileId = account.profile.id;

    await this.profileRepository.delete({ id: profileId });

    return { id: accountId };
  }
}
