import { Characters } from './characters';
import { Titles } from './titles';
import { XIVOptions } from './types';

export class XIV {
  public characters: Characters;
  public titles: Titles;

  constructor(options: XIVOptions = {}) {
    this.characters = new Characters(options);
    this.titles = new Titles(options);
  }
}
