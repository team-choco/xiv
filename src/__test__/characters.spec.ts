import { Fetch } from '@team-choco/utils';

import { getPoweredBy } from '../decorators/powered-by';

import { Characters } from '../characters';
import { chance } from '../__test__/utils/chance';

import { mockPaginatedResponse } from '../__test__/utils/mock';
import { Servers, DataCenters } from '../types';

const characters = new Characters();

jest.mock('@team-choco/utils');

describe('Class(Characters)', () => {
  describe('func(search)', () => {
    it('should be powered by xivapi', () => {
      expect(getPoweredBy(characters.search)).toStrictEqual({
        name: 'xivapi',
        url: 'https://xivapi.com',
      });
    });

    it('should return the results', async () => {
      const name = chance.string();

      const expectedResponse = mockPaginatedResponse<Characters.SearchResult>([{
        Avatar: chance.string(),
        ID: 0,
        Name: name,
        Lang: 'EN',
        Server: 'Famfrit (Primal)',
      }]);

      (Fetch as jest.MockedFunction<typeof Fetch>).mockResolvedValue(expectedResponse);

      const results = await characters.search({
        name,
      });

      expect(results).toStrictEqual(expectedResponse);

      expect(Fetch).toBeCalledTimes(1);
      expect(Fetch).toBeCalledWith('https://xivapi.com/character/search', {
        query: {
          name: name,
          server: null,
          page: null,
        },
      });
    });

    it('should support providing a server', async () => {
      const expectedName = chance.string();
      const expectedServer: Servers = 'Famfrit';

      const expectedResponse = mockPaginatedResponse<Characters.SearchResult>([{
        Avatar: chance.string(),
        ID: 0,
        Name: expectedName,
        Lang: 'EN',
        Server: 'Famfrit (Primal)',
      }]);

      (Fetch as jest.MockedFunction<typeof Fetch>).mockResolvedValue(expectedResponse);

      const results = await characters.search({
        name: expectedName,
        server: expectedServer,
      });

      expect(results).toStrictEqual(expectedResponse);

      expect(Fetch).toBeCalledTimes(1);
      expect(Fetch).toBeCalledWith('https://xivapi.com/character/search', {
        query: {
          name: expectedName,
          server: expectedServer,
          page: null,
        },
      });
    });

    it('should support providing a data center', async () => {
      const name = chance.string();
      const expectedDataCenter: DataCenters = 'Primal';

      const expectedResponse = mockPaginatedResponse<Characters.SearchResult>([{
        Avatar: chance.string(),
        ID: 0,
        Name: name,
        Lang: 'EN',
        Server: 'Famfrit (Primal)',
      }]);

      (Fetch as jest.MockedFunction<typeof Fetch>).mockResolvedValue(expectedResponse);

      const results = await characters.search({
        name,
        dataCenter: expectedDataCenter,
      });

      expect(results).toStrictEqual(expectedResponse);

      expect(Fetch).toBeCalledTimes(1);
      expect(Fetch).toBeCalledWith('https://xivapi.com/character/search', {
        query: {
          name: name,
          server: `_dc_${expectedDataCenter}`,
          page: null,
        },
      });
    });

    it('should support providing a page number', async () => {
      const name = chance.string();
      const expectedPageNumber = chance.integer({ min: 0 });

      const expectedResponse = mockPaginatedResponse<Characters.SearchResult>([{
        Avatar: chance.string(),
        ID: 0,
        Name: name,
        Lang: 'EN',
        Server: 'Famfrit (Primal)',
      }]);

      (Fetch as jest.MockedFunction<typeof Fetch>).mockResolvedValue(expectedResponse);

      const results = await characters.search({
        name,
        page: expectedPageNumber,
      });

      expect(results).toStrictEqual(expectedResponse);

      expect(Fetch).toBeCalledTimes(1);
      expect(Fetch).toBeCalledWith('https://xivapi.com/character/search', {
        query: {
          name: name,
          server: null,
          page: expectedPageNumber,
        },
      });
    });

    it('should ignore extra properties', async () => {
      const name = chance.string();

      const expectedResults: Characters.SearchResult[] = [{
        Avatar: chance.string(),
        ID: 0,
        Name: name,
        Lang: 'EN',
        Server: 'Famfrit (Primal)',
      }];

      const expectedResponse = mockPaginatedResponse(expectedResults);

      (Fetch as jest.MockedFunction<typeof Fetch>).mockResolvedValue(mockPaginatedResponse(expectedResults.map((result) => ({
        ...result,
        Rank: chance.string(),
      }))));

      const results = await characters.search({
        name,
      });

      expect(results).toStrictEqual(expectedResponse);
    });
  });

  describe('func(get)', () => {
    it('should be powered by xivapi', () => {
      expect(getPoweredBy(characters.get)).toStrictEqual({
        name: 'xivapi',
        url: 'https://xivapi.com',
      });
    });

    it('should return a specific characters information', async () => {
      const expectedResponse: Characters.GetApiResponse = {
        Character: {
          Avatar: chance.string(),
          Portrait: chance.string(),
          ID: chance.integer(),
          Bio: chance.string(),
          Race: chance.integer(),
          Gender: chance.integer(),
          Server: 'Famfrit',
          Title: chance.integer(),
        },
      };

      (Fetch as jest.MockedFunction<typeof Fetch>).mockResolvedValue(expectedResponse);

      const results = await characters.get(expectedResponse.Character.ID);

      expect(results).toStrictEqual({
        Avatar: expectedResponse.Character.Avatar,
        Portrait: expectedResponse.Character.Portrait,
        ID: expectedResponse.Character.ID,
        Bio: expectedResponse.Character.Bio,
        Race: expectedResponse.Character.Race,
        Gender: expectedResponse.Character.Gender,
        Server: expectedResponse.Character.Server,
        Title: expectedResponse.Character.Title,
      } as Characters.GetResponse);

      expect(Fetch).toBeCalledTimes(1);
      expect(Fetch).toBeCalledWith(`https://xivapi.com/character/${expectedResponse.Character.ID}`);
    });
  });
});
