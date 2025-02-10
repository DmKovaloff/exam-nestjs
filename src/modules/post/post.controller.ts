import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post, Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PostID, UserID } from '../../database/entities/types/entity-ids.type';
import { CurrentUser } from '../user/current-user.decorator';
import { IUserData } from '../auth/models/user-data.interface';
import {
  CreatePostReqDto,
  ListPostQueryDto,
  UpdatePostReqDto,
} from './dto/post.req.dto';
import { PostResDto } from './dto/post.res.dto';
import { PostService } from './post.service';
import { PostPresenter } from './post.presenter';

@ApiBearerAuth()
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreatePostReqDto,
  ): Promise<PostResDto> {
    const result = await this.postService.create(userData, dto);
    return PostPresenter.toResDto(result);
  }

  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: ListPostQueryDto,
  ): Promise<ListPostQueryDto> {
    const [entities, total] = await this.postService.findAll(userData, query);
    return PostPresenter.toResDtoList(entities, total, query);
  }


  @Put(':postId')
  public async update(
    @CurrentUser() userId: UserID,
    @Param('postId') postId: PostID,
    @Body() dto: UpdatePostReqDto,
  ): Promise<PostResDto> {
    const result = await this.postService.update(userId, postId, dto);
    return PostPresenter.toResDto(result);
  }
}
