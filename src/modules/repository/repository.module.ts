import { Global, Module } from '@nestjs/common';

import { PostRepository } from './post.repository';
import { RefreshTokenRepository } from './refresh-token.repository';
import { UserRepository } from './user.repository';

const repositories = [PostRepository, RefreshTokenRepository, UserRepository];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
