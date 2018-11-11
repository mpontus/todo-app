/**
 * Generic pagination class
 */
export interface IPagination<T> {
  /**
   * Total items available
   */
  total: number;

  /**
   * Items included in current page
   */
  items: T[];
}
