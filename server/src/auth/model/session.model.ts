import { User } from 'user/model/user.model';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Session Model
 *
 * Describes association between the user and access token.
 */
export class Session {
  /**
   * Access token used to associate client with user record
   */
  @ApiModelProperty()
  public token: string;

  /**
   * User details
   *
   * Will be undefined when the user is authenticated anonymously.
   */
  @ApiModelProperty({ type: User })
  public user: User;

  /**
   * Create new session
   */
  constructor(token: string, user: User) {
    this.token = token;
    this.user = user;
  }
}
