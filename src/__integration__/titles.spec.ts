import { Titles } from '../titles';

const titles = new Titles();

describe('Class(Titles)', () => {
  describe('func(get)', () => {
    it('should return a given title', async () => {
      const title = await titles.get(144);

      expect(title.ID).toEqual(144);
      expect(title.IsPrefix).toEqual(false);
      expect(title.NameMasculine).toEqual('The Heart of the Party');
      expect(title.NameFeminine).toEqual('The Heart of the Party');
    });
  });
});
