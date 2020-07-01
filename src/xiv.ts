import { Characters } from './characters';
import { XIVOptions } from './types';

export class XIV {
  public characters: Characters;

  constructor(options: XIVOptions = {}) {
    this.characters = new Characters(options);
  }
}
