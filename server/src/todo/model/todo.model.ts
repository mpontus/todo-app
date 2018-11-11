import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Todo model
 */
export class Todo {
  /**
   * Task id
   */

  @ApiModelProperty()
  public id: string;

  /**
   * Task description
   */
  @ApiModelProperty()
  public title: string;

  /**
   * Describes whether the task is completed
   */
  @ApiModelProperty()
  public done: string;

  /**
   * Describes the date assigned to the task
   */
  @ApiModelProperty()
  public date: string;

  /**
   * Constructor shorthand
   */
  constructor(data?: Partial<Todo>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
