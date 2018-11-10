/**
 * User model
 *
 * Exposes only the details necessary for authorization logic to work.
 */
export class User {
  /**
   * User id
   */
  public id: string;

  /**
   * Describes whether the user is anonymous
   */
  public isAnonymous: boolean;

  /**
   * Unique user name
   */
  public username: string | undefined;

  /**
   * Hashed user password
   */
  public passwordHash: string | undefined;

  /**
   * Constructor shorthand
   */
  constructor(values?: Partial<User>) {
    if (values) {
      Object.assign(this, values);
    }
  }
}
