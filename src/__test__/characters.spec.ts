import { getPoweredBy } from '../decorators/powered-by';

import { Characters } from '../characters';

const characters = new Characters();

describe('Class(Characters)', () => {
  describe('func(search)', () => {
    it('should be powered by xivapi', () => {
      expect(getPoweredBy(characters.search)).toStrictEqual({
        name: 'xivapi',
        url: 'https://xivapi.com',
      });
    });

    it('should return a list of characters', async () => {
      const { Results } = await characters.search({
        name: 'Flora Bunny',
        server: 'Leviathan',
      });

      expect(Results).toHaveLength(1);

      const [result] = Results;

      expect(result.Avatar).toBeTruthy();
      expect(result.ID).toEqual(9933602);
      expect(result.Name).toEqual('Flora Bunny');
      expect(result.Lang).toEqual('EN');
      expect(result.Server).toEqual('Leviathan (Primal)');
    });
  });

  describe('func(get)', () => {
    it('should be powered by xivapi', () => {
      expect(getPoweredBy(characters.get)).toStrictEqual({
        name: 'xivapi',
        url: 'https://xivapi.com',
      });
    });

    it('should a given character', async () => {
      const character = await characters.get(9933602);

      expect(character.ID).toEqual(9933602);
      expect(character.Avatar).toBeTruthy();
      expect(character.Bio).toBeTruthy();
      expect(character.Race).toEqual(3);
      expect(character.Gender).toEqual(2);
      expect(character.Server).toEqual('Leviathan');
    });
  });
});
