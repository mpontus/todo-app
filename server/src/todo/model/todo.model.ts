/**
 * Todo model
 */
export class Todo {
  /**
   * Task id
   */
  public id: string;

  /**
   * Task description
   */
  public title: string;

  /**
   * Describes whether the task is completed
   */
  public done: string;

  /**
   * Describes the date assigned to the task
   */
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
