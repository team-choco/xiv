import { getPoweredBy } from '../decorators/powered-by';

import { Characters } from '../characters';
import { chance } from '../__test__/utils/chance';

import { mockPaginatedResponse } from '../__test__/utils/mock';
import { Servers, DataCenters } from '../types';

const characters = new Characters();

jest.mock('@team-choco/utils');

describe('Class(Characters)', () => {
  describe('func(isFeminine)', () => {
    it('should return true if 2 is passed', () => {
      expect(characters.isFeminine(2)).toEqual(true);
    });

    it('should return false if any other number is passed', () => {
      expect(characters.isFeminine(1)).toEqual(false);
    });
  });

  describe('func(isMasculine)', () => {
    it('should return true if 1 is passed', () => {
      expect(characters.isMasculine(1)).toEqual(true);
    });

    it('should return false if any other number is passed', () => {
      expect(characters.isMasculine(2)).toEqual(false);
    });
  });

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

      characters.fetch = jest.fn().mockResolvedValue(expectedResponse);

      const results = await characters.search({
        name,
      });

      expect(results).toStrictEqual(expectedResponse);

      expect(characters.fetch).toBeCalledTimes(1);
      expect(characters.fetch).toBeCalledWith('/character/search', {
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

      characters.fetch = jest.fn().mockResolvedValue(expectedResponse);

      const results = await characters.search({
        name: expectedName,
        server: expectedServer,
      });

      expect(results).toStrictEqual(expectedResponse);

      expect(characters.fetch).toBeCalledTimes(1);
      expect(characters.fetch).toBeCalledWith('/character/search', {
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

      characters.fetch = jest.fn().mockResolvedValue(expectedResponse);

      const results = await characters.search({
        name,
        dataCenter: expectedDataCenter,
      });

      expect(results).toStrictEqual(expectedResponse);

      expect(characters.fetch).toBeCalledTimes(1);
      expect(characters.fetch).toBeCalledWith('/character/search', {
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

      characters.fetch = jest.fn().mockResolvedValue(expectedResponse);

      const results = await characters.search({
        name,
        page: expectedPageNumber,
      });

      expect(results).toStrictEqual(expectedResponse);

      expect(characters.fetch).toBeCalledTimes(1);
      expect(characters.fetch).toBeCalledWith('/character/search', {
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

      characters.fetch = jest.fn().mockResolvedValue(mockPaginatedResponse(expectedResults.map((result) => ({
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
          ID: chance.integer(),
          Name: chance.string(),
          Lang: chance.pickone(['EN', 'FR']),
          Avatar: chance.string(),
          Portrait: chance.string(),
          Bio: chance.string(),
          Race: chance.integer(),
          Gender: chance.integer(),
          Server: 'Famfrit',
          Title: chance.integer(),
        },
      };

      characters.fetch = jest.fn().mockResolvedValue(expectedResponse);

      const results = await characters.get(expectedResponse.Character.ID);

      expect(results).toStrictEqual({
        ID: expectedResponse.Character.ID,
        Name: expectedResponse.Character.Name,
        Lang: expectedResponse.Character.Lang,
        Avatar: expectedResponse.Character.Avatar,
        Portrait: expectedResponse.Character.Portrait,
        Bio: expectedResponse.Character.Bio,
        Race: expectedResponse.Character.Race,
        Gender: expectedResponse.Character.Gender,
        Server: expectedResponse.Character.Server,
        Title: expectedResponse.Character.Title,
      } as Characters.GetResponse);

      expect(characters.fetch).toBeCalledTimes(1);
      expect(characters.fetch).toBeCalledWith(`/character/${expectedResponse.Character.ID}`);
    });
  });
});
