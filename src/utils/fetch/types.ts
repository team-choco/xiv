import { RequestInit } from 'node-fetch';

export type TCRequestQueryValue = (string|number);

export interface TCRequestOptions extends RequestInit {
  query?: TCQueryParams;
}

export interface TCQueryParams {
  [key: string]: (undefined|null|TCRequestQueryValue|TCRequestQueryValue[]);
}
