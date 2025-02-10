import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInReqDto, SignUpReqDto } from '../dto/auth.req.dto';
import { AuthResDto, TokenPairResDto } from '../dto/auth.res.dto';
import { User } from '../../../database/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { UserRepository } from '../../repository/user.repository';
import { AuthCacheService } from './auth-cache-service';
import { RefreshTokenRepository } from '../../repository/refresh-token.repository';
import { Presenter } from '../models/presenter';
import { IUserData } from '../models/user-data.interface';

@Injectable()
export class AuthService {
  constructor(
    private refreshToken: RefreshTokenRepository,
    private tokenService: TokenService,
    private authCacheService: AuthCacheService,
    private userRepository: UserRepository,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailUniqueOrThrow(dto.email);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user: User = await this.userRepository.save(
      this.userRepository.create({ ...dto, password: hashedPassword }),
    );

    const tokenPair = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });

    await this.authCacheService.saveToken(tokenPair.accessToken, user.id);
    await this.refreshToken.save(
      this.refreshToken.create({
        user_id: user.id,
        refreshToken: tokenPair.refreshToken,
      }),
    );

    return { user: Presenter.presentResDto(user), tokenPair };
  }

  // public async signIn(dto: SignInReqDto): Promise<any> {}
  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const tokenPair = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });
    await this.authCacheService.saveToken(tokenPair.accessToken, user.id);

    await this.refreshToken.save(
      this.refreshToken.create({
        user_id: user.id,
        refreshToken: tokenPair.refreshToken,
      }),
    );
    return { user: Presenter.presentResDto(user), tokenPair };
  }

  public async signOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId),
      this.refreshToken.delete({
        user_id: userData.userId,
      }),
    ]);
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId),
      this.refreshToken.delete({
        user_id: userData.userId,
      }),
    ]);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: userData.userId,
    });
    await Promise.all([
      this.authCacheService.saveToken(tokens.accessToken, userData.userId),
      this.refreshToken.save(
        this.refreshToken.create({
          user_id: userData.userId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    return tokens;
  }

  private async isEmailUniqueOrThrow(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new Error('Email already exists');
    }
  }
}
