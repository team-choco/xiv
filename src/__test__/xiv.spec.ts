import { Characters } from '../characters';
import { Titles } from '../titles';

import { XIV, getPoweredBy } from '../';

describe('Class(XIV)', () => {
  const xiv = new XIV();

  describe('property(characters)', () => {
    it('should be a Characters class', () => {
      expect(xiv.characters).toBeInstanceOf(Characters);
    });
  });

  describe('property(titles)', () => {
    it('should be a Titles class', () => {
      expect(xiv.titles).toBeInstanceOf(Titles);
    });
  });
});

describe('func(getPoweredBy)', () => {
  it('should be defined', () => {
    expect(getPoweredBy).toBeInstanceOf(Function);
  });
});
