import { Injectable } from '@nestjs/common';

import { Post } from '../../database/entities/post.entity';
import { ListPostQueryDto } from './dto/post.req.dto';
import { PostListResDto, PostResDto } from './dto/post.res.dto';
import { Presenter } from '../auth/models/presenter';

@Injectable()
export class PostPresenter {
  public static toResDto(data: Post): PostResDto {
    return {
      id: data.id,
      title: data.title,
      body: data.body,
      user: data.user ? Presenter.presentResDto(data.user) : null,
    };
  }

  public static toResDtoList(
    data: Post[],
    total: number,
    query: ListPostQueryDto,
  ): PostListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
