import { RequestInit } from 'node-fetch';

export type TCRequestQueryValue = (string|number);

export interface TCRequestOptions extends RequestInit {
  query: {
    [key: string]: (undefined|null|TCRequestQueryValue|TCRequestQueryValue[]);
  };
}
