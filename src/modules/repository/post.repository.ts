import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Post } from '../../database/entities/post.entity';
import { IUserData } from '../auth/models/user-data.interface';
import { ListPostQueryDto } from '../post/dto/post.req.dto';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource.manager);
  }
  public async findAll(
    userData: IUserData,
    query: ListPostQueryDto,
  ): Promise<[Post[], number]> {
    const qb = this.createQueryBuilder('post');
    qb.leftJoinAndSelect('post.user', 'user');

    if (query.search) {
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
