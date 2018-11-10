import { User } from 'common/model/user.model';

/**
 * Session Model
 *
 * Describes association between the user and access token.
 */
export class Session {
  /**
   * Access token used to associate client with user record
   */
  public token: string;

  /**
   * User details
   *
   * Will be undefined when the user is authenticated anonymously.
   */
  public user: User | undefined;

  /**
   * Constructor shorthand
   */
  constructor(values?: Partial<Session>) {
    Object.assign(this, values);
  }
}
