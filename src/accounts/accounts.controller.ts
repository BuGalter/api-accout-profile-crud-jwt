import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IAccountInfo } from '../interfaces/account-info.interface';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto): Promise<IAccountInfo> {
    return this.accountsService.create(createAccountDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request): Promise<IAccountInfo> {
    return this.accountsService.findOne(+id, req);
  }

  @Post('login')
  login(@Body() loginAccountDto: LoginAccountDto): Promise<any> {
    return this.accountsService.login(loginAccountDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('logout/:id')
  logout(@Param('id') id: string, @Req() req: Request): Promise<number> {
    return this.accountsService.logout(+id, req);
  }
}
