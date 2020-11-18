import { Fetch } from '@team-choco/utils';

import { PaginatedResponse, Servers, DataCenters } from './types';

import { Base } from './base';
import { PoweredByXIVAPI } from './decorators/powered-by';

export class Characters extends Base {
  private server(server?: Servers, dataCenter?: DataCenters): (null|string) {
    if (server) return server;
    else if (dataCenter) return `_dc_${dataCenter}`;
    return null;
  }
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
        server: this.server(options.server, options.dataCenter),
        page: options.page || null,
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
      Portrait: response.Character.Portrait,
      Bio: response.Character.Bio,
      Race: response.Character.Race,
      Gender: response.Character.Gender,
      Server: response.Character.Server,
      Title: response.Character.Title,
    };
  }
}

export declare namespace Characters {
  interface SearchOptions {
    /**
     * The name of the character.
     */
    name: string;

    /**
     * The server the character belongs to.
     *
     * _This value takes precedence over dataCenter_
     */
    server?: Servers;

    /**
     * The data center the character belongs to.
     */
    dataCenter?: DataCenters;

    /**
     * The page number to request.
     */
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
    Character: {
      /**
       * The Character's Title ID
       */
      Title: number;

      /**
       * The character's portrait url.
       */
      Portrait: string;
    } & GetResponse;
  }

  interface GetResponse {
    /**
     * The character's avatar url.
     */
    Avatar: string;

    /**
     * The character's portrait url.
     */
    Portrait: string;

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

    /**
     * The character's title.
     */
    Title: number;
  }
}
