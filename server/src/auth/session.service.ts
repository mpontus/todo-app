import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Principal } from 'common/model/principal.model';
import { PasswordService } from 'common/password.service';
import { validateSchema } from 'common/utils/validateSchema';
import * as t from 'io-ts';
import { CreateProfileDto } from 'user/model/create-profile-dto.model';
import { User } from 'user/model/user.model';
import { UserService } from 'user/user.service';
import { InvalidPayloadError } from './exceptions/InvalidPayloadError';
import { JwtService } from './jwt.service';
import { Session } from './model/session.model';
import { LoginDto } from './model/login-dto.model';
import { AnonymousSession } from './model/anonymous-session';

/**
 * Validation schema for the payload stored in JWT token
 */
const tokenPayloadSchema = t.type({
  sub: t.string,
  isAnonymous: t.boolean,
});

/**
 * Session service
 *
 * Responsible for associating access token with user record
 */
@Injectable()
export class SessionService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(credentials: LoginDto): Promise<Session> {
    const user = await this.userService.findByUsername(credentials.username);

    if (
      user === undefined ||
      user.passwordHash === undefined ||
      !(await this.passwordService.verify(
        user.passwordHash,
        credentials.password,
      ))
    ) {
      throw new BadRequestException();
    }

    const token = await this.createToken(user);

    return new Session(token, user);
  }

  /**
   * Authenticate with persistent user account
   */
  public async signup(
    actor: Principal,
    profile: CreateProfileDto,
  ): Promise<Session> {
    const user = await this.userService.createUserProfile(actor, profile);
    const token = await this.createToken(user);

    return new Session(token, user);
  }

  /**
   * Authenticate with temporary user account
   */
  public async loginAnonymously(): Promise<AnonymousSession> {
    const user = await this.userService.createAnonymousUser();
    const token = await this.createToken(user);

    return new AnonymousSession(token);
  }

  /**
   * Return the user associated with the given access token.
   *
   * Throws Unauthorized error when the user is not found
   */
  public async authenticate(token: string): Promise<Principal> {
    try {
      const decoded = await this.jwtService.decode(token);
      const payload = await validateSchema(tokenPayloadSchema, decoded);

      return new User({
        id: payload.sub,
        isAnonymous: payload.isAnonymous,
      });
    } catch (error) {
      if (error instanceof InvalidPayloadError) {
        throw new UnauthorizedException();
      }

      throw error;
    }
  }

  /**
   * Create new session for the given user
   */
  private async createToken(user: User): Promise<string> {
    return await this.jwtService.encode({
      sub: user.id,
      isAnonymous: user.isAnonymous,
    });
  }
}
