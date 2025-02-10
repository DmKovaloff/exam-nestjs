import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Post} from './post.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { RefreshToken } from './refresh-token.entity';
import { BaseEntity } from './base.entity';
import { UserID } from './types/entity-ids.type';

@Entity({ name: TableNameEnum.USERS })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('text', { nullable: true })
  firstName: string;

  @Column('text', { nullable: true })
  lastName?: string;

  @Column('text', { nullable: true, default: 'Kyiv' })
  city: string;

  @Column('text', { nullable: true })
  age: number;

  @OneToMany(() => RefreshToken, (entity) => entity.user)
  refreshTokens?: RefreshToken[];

  @OneToMany(() => Post, (entity) => entity.user)
  posts?: Post[];
}
