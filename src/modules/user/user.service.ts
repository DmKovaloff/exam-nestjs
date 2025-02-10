import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../database/entities/types/entity-ids.type';
import { Config } from '../../config/config.type';
import { User } from '../../database/entities/user.entity';
import { IUserData } from '../auth/models/user-data.interface';
import { UserRepository } from '../repository/user.repository';
import { UpdateUserReqDto } from './dto/user.req.dto';
import { PostRepository } from '../repository/post.repository';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private userRepository: UserRepository,
    private postRepository: PostRepository,
    private tokenRepository: RefreshTokenRepository,
  ) {}

  public async findMe(userData: IUserData): Promise<User> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  public async deleteMe(userData: IUserData): Promise<void> {
    await this.userRepository.delete({ id: userData.userId });
    await this.tokenRepository.delete({ user_id: userData.userId });
  }

  public async findOne(userId: UserID): Promise<User> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
