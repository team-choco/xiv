import { XIVOptions } from './types';

export class Base {
  protected options: XIVOptions;

  constructor(options: XIVOptions = {}) {
    this.options = options;
  }
}
