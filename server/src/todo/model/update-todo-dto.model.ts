import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public date: string;
}
