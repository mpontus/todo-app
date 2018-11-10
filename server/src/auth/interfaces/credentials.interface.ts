/**
 * Login Credentials
 *
 * Send by the user on login
 */
export interface ICredentials {
  /**
   * Username or email
   */
  identifier: string;

  /**
   * Password
   */
  password: string;
}
