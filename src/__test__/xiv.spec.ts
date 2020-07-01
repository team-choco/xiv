import { Characters } from '../characters';

import { XIV } from '../';

describe('Class(XIV)', () => {
  const xiv = new XIV();

  describe('property(characters)', () => {
    it('should be a Characters class', () => {
      expect(xiv.characters).toBeInstanceOf(Characters);
    });
  });
});
