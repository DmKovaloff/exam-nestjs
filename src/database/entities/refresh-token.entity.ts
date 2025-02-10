import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { RefreshTokenID, UserID } from './types/entity-ids.type';

@Entity({ name: TableNameEnum.REFRESH_TOKENS })
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: RefreshTokenID;

  @Column('text')
  refreshToken: string;

  @Column('text')
  user_id: UserID;

  @ManyToOne(() => User, (entity) => entity.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
