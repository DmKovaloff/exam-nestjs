import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInReqDto, SignUpReqDto } from './dto/auth.req.dto';
import { AuthResDto, TokenPairResDto } from './dto/auth.res.dto';
import { Public } from './guards/is-public';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CurrentUser } from '../user/current-user.decorator';
import { IUserData } from './models/user-data.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @Public()
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @Post('sign-in')
  @Public()
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.signOut(userData);
  }

  @Public()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }
}
