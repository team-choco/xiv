import { Characters } from './characters';
import { XIVOptions } from './types';

export class XIV {
  public character: Characters;

  constructor(options: XIVOptions) {
    this.character = new Characters(options);
  }
}
