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
import { PostID, UserID } from './types/entity-ids.type';

@Entity({ name: TableNameEnum.POSTS })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: PostID;

  @Column('text')
  title: string;

  @Column('text', { nullable: false })
  body: string;

  @Column()
  user_id: UserID;

  @ManyToOne(() => User, (entity) => entity.posts)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
