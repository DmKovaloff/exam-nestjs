import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RefreshToken } from '../../database/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshToken, dataSource.manager);
  }

  public async isRefreshTokenExist(refreshToken: string): Promise<boolean> {
    return await this.existsBy({ refreshToken });
  }
}
