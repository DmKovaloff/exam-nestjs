import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../user/dto/user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'firstName',
  'lastName',
  'city',
]) {}

export class SignUpReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'firstName',
  'lastName',
]) {}

export class SignInReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
]) {}

// export class ForgotPasswordReqDto extends PickType(BaseAuthReqDto, ['email']) {}
