import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Post('login')
  login(@Body() loginAccountDto: LoginAccountDto) {
    return this.accountsService.login(loginAccountDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Get('logout/:id')
  logout(@Param('id') id: string) {
    return this.accountsService.logout(+id);
  }
}
