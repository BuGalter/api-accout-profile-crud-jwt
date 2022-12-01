import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IAccountInfo } from '../interfaces/account-info.interface';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(
    @Body() createProfileDto: CreateProfileDto,
    @Req() req: Request,
  ): Promise<IAccountInfo> {
    return this.profilesService.create(createProfileDto, req);
  }

  @Get(':accountId')
  findOne(
    @Param('accountId') accountId: string,
    @Req() req: Request,
  ): Promise<IAccountInfo> {
    return this.profilesService.findOne(+accountId, req);
  }

  @Patch(':accountId')
  update(
    @Param('accountId') accountId: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: Request,
  ): Promise<IAccountInfo> {
    return this.profilesService.update(+accountId, updateProfileDto, req);
  }

  @Delete(':accountId')
  remove(
    @Param('accountId') accountId: string,
    @Req() req: Request,
  ): Promise<any> {
    return this.profilesService.remove(+accountId, req);
  }
}
