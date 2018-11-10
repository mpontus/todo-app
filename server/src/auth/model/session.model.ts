import { User } from 'common/model/user.model';

/**
 * Session Model
 *
 * Describes association between the user and access token.
 */
export class Session {
  public token: string;

  public user: User;

  constructor(values?: Partial<Session>) {
    Object.assign(this, values);
  }
}
