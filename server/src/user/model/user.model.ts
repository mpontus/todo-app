import { Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User model
 *
 * Exposes only the details necessary for authorization logic to work.
 */
export class User {
  /**
   * User id
   */
  @ApiModelProperty()
  public id: string;

  /**
   * Unique user name
   */
  @ApiModelProperty({ type: 'string' })
  public username: string | undefined;

  /**
   * Hashed user password
   */
  @Exclude()
  public passwordHash: string | undefined;

  /**
   * Describes whether the user is anonymous
   */
  @Exclude()
  public isAnonymous: boolean;

  /**
   * Constructor shorthand
   */
  constructor(values?: Partial<User>) {
    if (values) {
      Object.assign(this, values);
    }
  }
}
