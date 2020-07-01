import { PaginatedResponse, Servers } from './types';

import { Base } from './base';
import { PoweredByXIVAPI } from './decorators/powered-by';
import { Fetch } from './utils/fetch';

export class Characters extends Base {
  /**
   * Searches for characters given a set of criteria.
   *
   * @param options - the search criteria.
   * @returns characters matching the given criteria.
   */
  @PoweredByXIVAPI
  async search(options: Characters.SearchOptions): Promise<Characters.SearchResponse> {
    const response = await Fetch<Characters.SearchResponse>('https://xivapi.com/character/search', {
      query: {
        name: options.name,
        server: options.server,
        page: options.page,
      },
    });

    return {
      Pagination: response.Pagination,
      Results: response.Results.map((result) => {
        result.Server = result.Server.replace(/\s/g, ' ');

        return {
          Avatar: result.Avatar,
          ID: result.ID,
          Name: result.Name,
          Lang: result.Lang,
          Server: result.Server.replace(/\s/g, ' '),
        };
      }),
    }
  }

  /**
   * Retrieves the information for a character given the lodestone id.
   *
   * @param id - the lodestone id of the character.
   * @returns the character information.
   */
  @PoweredByXIVAPI
  async get(id: number): Promise<Characters.GetResponse> {
    const response = await Fetch<Characters.GetApiResponse>(`https://xivapi.com/character/${id}`);

    return {
      ID: response.Character.ID,
      Avatar: response.Character.Avatar,
      Bio: response.Character.Bio,
      Race: response.Character.Race,
      Gender: response.Character.Gender,
      Server: response.Character.Server,
    };
  }
}

export declare namespace Characters {
  interface SearchOptions {
    name: string;
    server?: Servers;
    page?: number;
  }

  type SearchResponse = PaginatedResponse<SearchResult>;

  interface SearchResult {
    /**
     * The character's avatar url.
     */
    Avatar: string;

    /**
     * The character's lodestone id.
     */
    ID: number;

    /**
     * The character's name.
     */
    Name: string;

    /**
     * Slash delimited list of the users language.
     *
     * @example 'EN/FR'
     */
    Lang: string;

    /**
     * The characters server.
     *
     * @example 'Famfrit (Primal)'
     */
    Server: string;
  }

  interface GetApiResponse {
    Character: GetResponse;
  }

  interface GetResponse {
    /**
     * The character's avatar url.
     */
    Avatar: string;

    /**
     * The character's lodestone id.
     */
    ID: number;

    /**
     * The character's bio.
     */
    Bio: string;

    /**
     * The character's gender.
     */
    Gender: number;

    /**
     * The character's race.
     */
    Race: number;

    /**
     * The character's server.
     */
    Server: Servers;
  }
}
