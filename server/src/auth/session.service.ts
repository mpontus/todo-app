import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Principal } from 'common/model/principal.model';
import { User } from 'common/model/user.model';
import { PasswordService } from 'common/password.service';
import { validateSchema } from 'common/utils/validateSchema';
import * as t from 'io-ts';
import { IProfileUpdate } from 'user/interface/IProfile';
import { UserService } from 'user/user.service';
import { InvalidPayloadError } from './exceptions/InvalidPayloadError';
import { ICredentials } from './interfaces/credentials.interface';
import { JwtService } from './jwt.service';
import { Session } from './model/session.model';

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

  public async login(credentials: ICredentials): Promise<Session> {
    const user = await this.userService.findByIdentifier(
      credentials.identifier,
    );

    if (
      user === undefined ||
      user.passwordHash === undefined ||
      !this.passwordService.verify(user.passwordHash, credentials.password)
    ) {
      throw new BadRequestException();
    }

    return this.createSession(user);
  }

  /**
   * Authenticate with persistent user account
   */
  public async signup(
    actor: Principal,
    profile: IProfileUpdate,
  ): Promise<Session> {
    const user = await this.userService.createUserProfile(actor, profile);

    return this.createSession(user);
  }

  /**
   * Authenticate with temporary user account
   */
  public async loginAnonymously(): Promise<Session> {
    const user = await this.userService.createAnonymousUser();

    return this.createSession(user);
  }

  /**
   * Create new session for the given user
   */
  public async createSession(user: User): Promise<Session> {
    const token = await this.jwtService.encode({
      sub: user.id,
      isAnonymous: true,
    });

    return new Session({
      token,
      user,
    });
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
}
