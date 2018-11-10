import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  title: string;
}
