import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../common/helpers/transform.helper';
import { PickType } from '@nestjs/swagger';

export class BasePostReqDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @IsString()
  @Length(0, 3000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  body: string;

  @IsArray()
  @IsString({ each: true })
  @Length(3, 30, { each: true })
  @ArrayMaxSize(5)
  @Transform(TransformHelper.uniqueItems)
  tags: string[];
}

export class CreatePostReqDto extends PickType(BasePostReqDto, [
  'title',
  'body',
  'tags',
]) {}

export class UpdatePostReqDto extends PickType(BasePostReqDto, [
  'title',
  'body',
]) {}

export class ListPostQueryDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @IsOptional()
  search?: string;
}