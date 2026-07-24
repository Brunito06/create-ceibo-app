/** A value that may not have loaded/been set yet. */
export type Maybe<T> = T | null | undefined;

/** Shared shape for paginated API responses. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
