import { ApiProperty, PickType } from '@nestjs/swagger';

export class BaseUserResDto {
  @ApiProperty({
    example: '121324354678976543fdg',
    description: 'The id of the User',
  })
  id: string;

  @ApiProperty({
    example: 'examnestjs@gmail.com',
    description: 'The email of the User',
  })
  public readonly email: string;

  @ApiProperty({
    example: 'Jon',
    description: 'The first name of the User',
  })
  public readonly firstName: string;

  @ApiProperty({
    example: 'Snow',
    description: 'The last name of the User',
  })
  public readonly lastName: string;

  @ApiProperty({
    example: 'Kyiv',
    description: 'User city of residence',
  })
  public readonly city: string;

  @ApiProperty({
    example: '18',
    description: 'User age',
  })
  public readonly age: number;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The date and time when the user account was created.',
  })
  public readonly createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T12:00:00.000Z',
    description: 'The date and time when the user account was last updated.',
  })
  public readonly updatedAt: Date;
}

export class UserResDto extends PickType(BaseUserResDto, [
  'id',
  'email',
  'lastName',
  'firstName',
  'age',
  'city',
  'createdAt',
  'updatedAt',
]) {}
