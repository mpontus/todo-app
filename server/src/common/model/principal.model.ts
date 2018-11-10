/**
 * Principal model
 *
 * Contains details necessary for authentication logic.
 */
export class Principal {
  /**
   * User id
   */
  id: string;

  /**
   * Describes whether the user is anonymous
   */
  isAnonymous: boolean;

  /**
   * Constructor shorthand
   */
  constructor(data: Partial<Principal>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
