/**
 * Describes writable task properties
 */
export interface ITodoUpdate {
  /**
   * Updated task title
   */
  title?: string;

  /**
   * Updated task date
   */
  date?: string;

  /**
   * Updated state of the task
   */
  done?: boolean;
}
