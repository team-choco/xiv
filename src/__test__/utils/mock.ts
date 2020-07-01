import { PaginatedResponse } from '../../types';

export function mockPaginatedResponse<T>(results: T[], overrides: Partial<PaginatedResponse<T>> = {}): PaginatedResponse<T> {
  return {
    Results: results,
    ...overrides,
    Pagination: {
      Page: 0,
      PageNext: null,
      PagePrev: null,
      PageTotal: 1,
      Results: results.length,
      ResultsPerPage: 50,
      ResultsTotal: results.length,
      ...overrides.Pagination,
    },
  };
}
