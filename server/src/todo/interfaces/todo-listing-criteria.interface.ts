/**
 * Todo Listing Criteria
 */
export interface ITodoListingCriteria {
  /**
   * Specifies the date to show todos for
   */
  date?: string;

  /**
   * Pagination offset
   */
  skip?: number;

  /**
   * Pagination limit
   */
  take?: number;
}
