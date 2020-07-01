import { Arrays } from '@team-choco/utils';

import { Characters } from '../characters';

const characters = new Characters();

describe('Class(Characters)', () => {
  describe('func(search)', () => {
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

    it('should support searching data centers', async () => {
      const { Results } = await characters.search({
        name: 'Bunny',
        dataCenter: 'Primal',
      });

      const servers = Arrays.unique(Results.map((result) => result.Server));

      expect(servers.length).toBeGreaterThan(1);
    });
  });

  describe('func(get)', () => {
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
