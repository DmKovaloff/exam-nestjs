import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch, Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../database/entities/types/entity-ids.type';
import { IUserData } from '../auth/models/user-data.interface';
import { UpdateUserReqDto } from './dto/user.req.dto';
import { BaseUserResDto } from './dto/user.res.dto';
import { Presenter } from '../auth/models/presenter';
import { UserService } from './user.service';
import { CurrentUser } from './current-user.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData) {
    const result = await this.usersService.findMe(userData);
    return Presenter.presentResDto(result);
  }

  @ApiBearerAuth()
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    const result = await this.usersService.updateMe(userData, updateUserDto);
    return Presenter.presentResDto(result);
  }

  @ApiBearerAuth()
  @Delete('me')
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteMe(userData);
  }

  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<BaseUserResDto> {
    const result = await this.usersService.findOne(userId);
    return Presenter.presentResDto(result);
  }
}
