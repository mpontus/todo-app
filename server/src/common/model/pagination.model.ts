/**
 * Generic pagination class
 */
export class Pagination<T> {
  /**
   * Total items available
   */
  public total: number;

  /**
   * Items included in current page
   */
  public items: T[];

  constructor(total: number, items: T[]) {
    this.total = total;
    this.items = items;
  }
}
