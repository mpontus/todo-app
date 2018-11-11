import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

/**
 * Todo Listing Criteria
 */
export class TodoListingCriteria {
  /**
   * Specifies the date to show todos for
   */
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public date?: string;

  /**
   * Pagination offset
   */
  @ApiModelProperty()
  @IsOptional()
  @IsPositive()
  @Transform((val: string) => parseInt(val, 10))
  public skip?: number;

  /**
   * Pagination limit
   */
  @ApiModelProperty()
  @IsOptional()
  @IsPositive()
  @Transform((val: string) => parseInt(val, 10))
  public take?: number;
}
