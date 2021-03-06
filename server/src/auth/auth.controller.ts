import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'common/guards/auth.guard';
import { IRequest } from 'common/interface/IRequest';
import { CreateProfileDto } from 'user/model/create-profile-dto.model';
import { AnonymousSession } from './model/anonymous-session';
import { LoginDto } from './model/login-dto.model';
import { Session } from './model/session.model';
import { SessionService } from './session.service';
import { SignupValidation } from './validation/signup.validation';

/**
 * Auth Controller
 *
 * Responsible for handling authentication
 */
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly sessionService: SessionService) {}

  /**
   * Login as anonymous user
   */
  @Post('anonymous')
  @ApiOkResponse({ type: AnonymousSession })
  public async loginAnonymously(): Promise<AnonymousSession> {
    return this.sessionService.loginAnonymously();
  }

  /**
   * Login as permanent user
   */
  @Post('login')
  @ApiOkResponse({ type: Session })
  public async login(@Body() credentials: LoginDto): Promise<Session> {
    return this.sessionService.login(credentials);
  }

  /**
   * Convert anonymous account to permanent one
   */
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Session })
  public async signup(
    @Req() req: IRequest,
    @Body() data: CreateProfileDto,
  ): Promise<Session> {
    return this.sessionService.signup(req.user, data);
  }
}
