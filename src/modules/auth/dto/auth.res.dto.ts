import { UserResDto } from '../../user/dto/user.res.dto';

export class AuthResDto {
  tokenPair: TokenPairResDto;
  user: UserResDto;
}

export class TokenPairResDto {
  accessToken: string;
  refreshToken: string;
}
