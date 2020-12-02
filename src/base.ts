import { Fetch, TCRequestOptions } from '@team-choco/utils';
import { URL } from 'url';
import { XIVOptions } from './types';

export class Base {
  protected options: XIVOptions;

  constructor(options: XIVOptions = {}) {
    this.options = options;
  }

  public fetch<T>(url: string, options?: TCRequestOptions): Promise<T> {
    if (this.options.staging) {
      return Fetch<T>(new URL(url, 'https://staging.xivapi.com').toString(), options);
    }

    return Fetch<T>(new URL(url, 'https://xivapi.com').toString(), options);
  }
}
