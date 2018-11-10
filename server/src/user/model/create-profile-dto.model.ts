import { ApiModelProperty } from '@nestjs/swagger';
import { MinLength, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @ApiModelProperty()
  @MaxLength(255)
  readonly username: string;

  @ApiModelProperty()
  @MinLength(6)
  readonly password: string;
}
