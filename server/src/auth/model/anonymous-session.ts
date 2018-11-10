import { ApiModelProperty } from '@nestjs/swagger';

export class AnonymousSession {
  @ApiModelProperty()
  public readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}
