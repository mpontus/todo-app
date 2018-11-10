import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'common/guards/auth.guard';
import { IRequest } from 'common/interface/IRequest';
import { IProfileUpdate } from 'user/interface/IProfile';
import { ICredentials } from './interfaces/credentials.interface';
import { Session } from './model/session.model';
import { SessionService } from './session.service';
import { SignupValidation } from './validation/signup.validation';

/**
 * Auth Controller
 *
 * Responsible for handling authentication
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly sessionService: SessionService) {}

  /**
   * Login as anonymous user
   */
  @Post('anonymous')
  public async loginAnonymously(): Promise<Session> {
    return this.sessionService.loginAnonymously();
  }

  /**
   * Login as permanent user
   */
  @Post('login')
  public async login(@Body() credentials: ICredentials): Promise<Session> {
    return this.sessionService.login(credentials);
  }

  /**
   * Convert anonymous account to permanent one
   */
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  public async signup(
    @Req() req: IRequest,
    @Body() data: SignupValidation,
  ): Promise<Session> {
    return this.sessionService.signup(req.user, {
      username: data.username,
      password: data.password,
    });
  }
}
