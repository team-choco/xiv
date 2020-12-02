import { Fetch } from '@team-choco/utils';
import { Base } from '../base';
import { chance } from './utils/chance';

jest.mock('@team-choco/utils');

describe('Class(Base)', () => {
  describe('func(fetch)', () => {
    it('should support hitting the live environment', async () => {
      const path = chance.string();

      const base = new Base();

      await base.fetch(path);

      expect(Fetch).toBeCalledTimes(1);
      expect(Fetch).toBeCalledWith(`https://xivapi.com/${path}`, undefined);
    });

    it('should support hitting the staging environment', async () => {
      const path = chance.string();

      const base = new Base({
        staging: true,
      });

      await base.fetch(path);

      expect(Fetch).toBeCalledTimes(1);
      expect(Fetch).toBeCalledWith(`https://staging.xivapi.com/${path}`, undefined);
    });
  });
});
