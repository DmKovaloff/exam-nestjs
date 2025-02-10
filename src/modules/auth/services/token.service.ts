import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config, JwtConfig } from '../../../config/config.type';
import { TokenType } from '../models/token-type.enum';
import { IJwtPayload } from '../models/jwt-payload.interface';
import { ITokenPair } from '../models/token-pair.interface';
import { LoggerService } from '../../logger/service/logger.service';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
    private readonly loggerService: LoggerService,
  ) {
    this.jwtConfig = configService.get<JwtConfig>('jwt');
  }

  public async generateAuthTokens(payload: IJwtPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpiresIn,
    });
    return { accessToken, refreshToken };
  }

  public async verifyToken(
    token: string,
    tokenType: TokenType,
  ): Promise<IJwtPayload> {
    try {
      return (await this.jwtService.verify(token, {
        secret: this.getSecret(tokenType),
      })) as IJwtPayload;
    } catch (error) {
      this.loggerService.error('Token verification error: ' + error);
    }
  }

  private getSecret(type: TokenType): string {
    let secret: string;
    switch (type) {
      case TokenType.ACCESS:
        secret = this.jwtConfig.accessSecret;
        break;
      case TokenType.REFRESH:
        secret = this.jwtConfig.refreshSecret;
        break;
      default:
        throw new Error('Unknown token type');
    }
    return secret;
  }
}
