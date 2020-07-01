import { Arrays } from '../arrays';
import { chance } from './chance';

describe('Utils(Arrays)', () => {
  describe('func(unique)', () => {
    it('should return the unique values', async () => {
      const expectedItem = chance.string();
      const otherExpectedItem = chance.string();

      const result = Arrays.unique([expectedItem, otherExpectedItem, expectedItem, expectedItem]);

      expect(result).toStrictEqual([expectedItem, otherExpectedItem]);
    });

    it('should support providing an identifier', async () => {
      const property = chance.string();
      const expectedItem = {
        [property]: chance.string(),
      };
      const otherExpectedItem = {
        [property]: chance.string(),
      };

      const result = Arrays.unique([{ ...expectedItem }, { ...otherExpectedItem }, { ...expectedItem }, { ...expectedItem }], (item) => item[property]);

      expect(result).toStrictEqual([expectedItem, otherExpectedItem]);
    });
  });
});
