import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { TransformHelper } from '../../../common/helpers/transform.helper';
import { IsCityAllowed } from '../../../common/decorator/city.decorator';

export class BaseUserReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'examnestjs@gmail.com' })
  @Matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
  @Transform(TransformHelper.toLowerCase)
  @Transform(TransformHelper.trim)
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  @Transform(TransformHelper.trim)
  password: string;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({ required: false })
  firstName: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({ required: false })
  lastName: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  age: number;

  @ApiProperty({
    required: false,
    description: 'User city',
    example: 'Poltava',
  })
  @IsOptional()
  @IsCityAllowed({
    groups: ['Lviv', 'Odessa', 'Kharkiv'],
    message: 'City is not allowed',
  })
  city: string;
}

export class UpdateUserReqDto extends BaseUserReqDto {
  @IsOptional()
  age: number;

  @IsOptional()
  city: string;
}
