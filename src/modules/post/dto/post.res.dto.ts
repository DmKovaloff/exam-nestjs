import { ApiProperty } from '@nestjs/swagger';
import { UserResDto } from '../../user/dto/user.res.dto';
import { ListPostQueryDto } from './post.req.dto';

export class PostResDto {
  @ApiProperty({
    description: 'Article ID',
  })
  id: string;

  @ApiProperty({
    example: 'Post Title',
    description: 'Post Title',
  })
  title: string;

  @ApiProperty({
    example: 'Post Body',
    description: 'Post Body',
  })
  body: string;

  user?: UserResDto;
}

export class PostListResDto extends ListPostQueryDto {
  data: PostResDto[];
  total: number;
}
