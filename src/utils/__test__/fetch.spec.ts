import fetch, { Response } from 'node-fetch';

import { Fetch } from '../fetch';
import { chance } from './chance';
import { buildUrl } from '../fetch/fetch';

jest.mock('node-fetch');

describe('utils(Fetch)', () => {
  describe('func(Fetch)', () => {
    it('should automatically parse json', async () => {
      const expectedResponse = chance.string();

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        headers: {
          get: (name: string) => name.toLowerCase() === 'content-type' ? 'application/json' : undefined,
        },
        json: () => expectedResponse,
      } as unknown as Response);

      const response = await Fetch(chance.url());

      expect(response).toStrictEqual(expectedResponse);
    });

    it('should automatically parse text', async () => {
      const expectedResponse = chance.string();

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        headers: {
          get: (name: string) => name.toLowerCase() === 'content-type' ? 'application/text' : undefined,
        },
        text: () => expectedResponse,
      } as unknown as Response);

      const response = await Fetch(chance.url());

      expect(response).toStrictEqual(expectedResponse);
    });

    it('should support errors', async () => {
      const expectedResponse = chance.string();

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        headers: {
          get: (name: string) => name.toLowerCase() === 'content-type' ? 'application/json' : undefined,
        },
        json: () => expectedResponse,
        status: 400,
      } as unknown as Response);

      await expect(() => Fetch(chance.url())).rejects.toStrictEqual(expectedResponse);
    });
  });

  describe('func(buildUrl)', () => {
    it('should support query params', async () => {
      const host = chance.url();
      const expectedKey = chance.word();
      const expectedValue = chance.word();

      const result = buildUrl(host, {
        [expectedKey]: expectedValue,
      });

      expect(result).toStrictEqual(`${host}?${expectedKey}=${expectedValue}`);
    });

    it('should support multiple keys', async () => {
      const host = chance.url();
      const expectedKey = chance.word();
      const expectedValue = chance.word();
      const otherExpectedKey = chance.word();
      const otherExpectedValue = chance.word();

      const result = buildUrl(host, {
        [expectedKey]: expectedValue,
        [otherExpectedKey]: otherExpectedValue,
      });

      expect(result).toStrictEqual(`${host}?${expectedKey}=${expectedValue}&${otherExpectedKey}=${otherExpectedValue}`);
    });

    it('should support arrays', async () => {
      const host = chance.url();
      const expectedKey = chance.word();
      const expectedValue = chance.word();
      const otherExpectedValue = chance.word();

      const result = buildUrl(host, {
        [expectedKey]: [expectedValue, otherExpectedValue],
      });

      expect(result).toStrictEqual(`${host}?${expectedKey}=${expectedValue}&${expectedKey}=${otherExpectedValue}`);
    });

    it('should ignore falsy values', async () => {
      const host = chance.url();

      const result = buildUrl(host, {
        [chance.word()]: null,
      });

      expect(result).toStrictEqual(host);
    });

    it('should support not passing query params', async () => {
      const host = chance.url();

      const result = buildUrl(host);

      expect(result).toStrictEqual(host);
    });
  });
});
