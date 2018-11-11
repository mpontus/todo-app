import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  date: string;
}
