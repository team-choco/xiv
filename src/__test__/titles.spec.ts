import { getPoweredBy } from '../decorators/powered-by';

import { Titles } from '../titles';
import { chance } from '../__test__/utils/chance';

const titles = new Titles();

jest.mock('@team-choco/utils');

describe('Class(Characters)', () => {
  describe('func(get)', () => {
    it('should be powered by xivapi', () => {
      expect(getPoweredBy(titles.get)).toStrictEqual({
        name: 'xivapi',
        url: 'https://xivapi.com',
      });
    });

    it('should return a specific characters information', async () => {
      const expectedResponse: Titles.GetApiResponse = {
        ID: chance.integer(),
        IsPrefix: chance.bool() ? 1 : 0,
        Name: chance.string(),
        Name_de: chance.string(),
        Name_en: chance.string(),
        Name_fr: chance.string(),
        Name_ja: chance.string(),
        NameFemale: chance.string(),
        NameFemale_de: chance.string(),
        NameFemale_en: chance.string(),
        NameFemale_fr: chance.string(),
        NameFemale_ja: chance.string(),
      };

      titles.fetch = jest.fn().mockResolvedValue(expectedResponse);

      const results = await titles.get(expectedResponse.ID);

      expect(results).toStrictEqual({
        ID: expectedResponse.ID,
        IsPrefix: expectedResponse.IsPrefix === 1,
        NameMasculine: expectedResponse.Name,
        NameFeminine: expectedResponse.NameFemale,
      } as Titles.GetResponse);

      expect(titles.fetch).toBeCalledTimes(1);
      expect(titles.fetch).toBeCalledWith(`/Title/${expectedResponse.ID}`);
    });
  });
});
