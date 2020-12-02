import { Arrays } from '@team-choco/utils';

import { Characters } from '../characters';
import { getTypeStructure } from '../__test__/utils/structure';

const characters = new Characters({
  staging: true,
});

describe('Class(Characters)', () => {
  describe('func(search)', () => {
    it('should return a list of characters', async () => {
      const { Results } = await characters.search({
        name: 'Cecilia Sanare',
        server: 'Famfrit',
      });

      expect(Results).toHaveLength(1);

      const [result] = Results;

      expect(getTypeStructure(result)).toEqual({
        ID: 'number',
        Name: 'string',
        Lang: 'string',
        Server: 'string',
        Avatar: 'string',
      });
    });

    it('should support searching data centers', async () => {
      const { Results } = await characters.search({
        name: 'Cecilia Sanare',
        dataCenter: 'Primal',
      });

      const servers = Arrays.unique(Results.map((result) => result.Server));

      expect(servers.length).toBeGreaterThan(1);
    });
  });

  describe('func(get)', () => {
    it('should return a given character', async () => {
      const character = await characters.get(9933602);

      expect(getTypeStructure(character)).toEqual({
        ID: 'number',
        Name: 'string',
        Lang: null,
        Race: 'number',
        Gender: 'number',
        Title: 'number',
        Server: 'string',
        Avatar: 'string',
        Bio: 'string',
        Portrait: 'string',
      });
    });
  });
});
