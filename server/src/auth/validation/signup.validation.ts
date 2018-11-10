import { MaxLength, MinLength } from 'class-validator';

/**
 * Validation schema for signup details
 */
export class SignupValidation {
  @MaxLength(255)
  username: string;

  @MinLength(6)
  password: string;
}
