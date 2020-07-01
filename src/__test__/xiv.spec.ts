import { Characters } from '../characters';

import { XIV, getPoweredBy } from '../';

describe('Class(XIV)', () => {
  const xiv = new XIV();

  describe('property(characters)', () => {
    it('should be a Characters class', () => {
      expect(xiv.characters).toBeInstanceOf(Characters);
    });
  });
});

describe('func(getPoweredBy)', () => {
  it('should be defined', () => {
    expect(getPoweredBy).toBeInstanceOf(Function);
  });
});