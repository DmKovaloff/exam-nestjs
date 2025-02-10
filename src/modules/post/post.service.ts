import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  CreatePostReqDto,
  ListPostQueryDto,
  UpdatePostReqDto,
} from './dto/post.req.dto';
import { IUserData } from '../auth/models/user-data.interface';
import { PostRepository } from '../repository/post.repository';
import { Post } from '../../database/entities/post.entity';
import { PostID, UserID } from '../../database/entities/types/entity-ids.type';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(
    userData: IUserData,
    dto: CreatePostReqDto,
  ): Promise<Post> {
    return await this.postRepository.save(
      this.postRepository.create({ ...dto, user_id: userData.userId }),
    );
  }

  public async findAll(
    userData: IUserData,
    query: ListPostQueryDto,
  ): Promise<[Post[], number]> {
    return await this.postRepository.findAll(userData, query);
  }

  public async update(
    userId: UserID,
    postId: PostID,
    dto: UpdatePostReqDto,
  ): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.user_id !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }
    if (dto.title) {
      post.title = dto.title;
    }
    if (dto.body) {
      post.body = dto.body;
    }
    await this.postRepository.save(post);
    return post;
  }
}
