import { MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Validation schema for signup details
 */
export class SignupValidation {
  @ApiModelProperty()
  @MaxLength(255)
  username: string;

  @ApiModelProperty()
  @MinLength(6)
  password: string;
}
