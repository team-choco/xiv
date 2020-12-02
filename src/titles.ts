import { Base } from './base';
import { PoweredByXIVAPI } from './decorators/powered-by';

export class Titles extends Base {
  /**
   * Retrieves the information for a character given the lodestone id.
   *
   * @param id - the lodestone id of the character.
   * @returns the character information.
   */
  @PoweredByXIVAPI
  async get(id: number): Promise<Titles.GetResponse> {
    const response = await this.fetch<Titles.GetApiResponse>(`/Title/${id}`);

    return {
      ID: response.ID,
      IsPrefix: response.IsPrefix === 1,
      NameMasculine: response.Name,
      NameFeminine: response.NameFemale,
    };
  }
}

export declare namespace Titles {
  interface GetApiResponse {
    /**
     * The Title's ID
     */
    ID: number;

    /**
     * Is the title a prefix?
     */
    IsPrefix: number;

    /**
     * The title name (masculine).
     */
    Name: string;

    /**
     * The title name in German (masculine).
     */
    Name_de: string;

    /**
     * The title name in English (masculine).
     */
    Name_en: string;

    /**
     * The title name in French (masculine).
     */
    Name_fr: string;

    /**
     * The title name in Japanese (masculine).
     */
    Name_ja: string;
    /**
     * The title name (feminine).
     */
    NameFemale: string;

    /**
     * The title name in German (feminine).
     */
    NameFemale_de: string;

    /**
     * The title name in English (feminine).
     */
    NameFemale_en: string;

    /**
     * The title name in French (feminine).
     */
    NameFemale_fr: string;

    /**
     * The title name in Japanese (feminine).
     */
    NameFemale_ja: string;
  }

  interface GetResponse {
    /**
     * The Title's ID
     */
    ID: number;

    /**
     * Is the title a prefix?
     */
    IsPrefix: boolean;

    /**
     * The title name (masculine).
     */
    NameMasculine: string;

    /**
     * The title name (feminine).
     */
    NameFeminine: string;
  }
}
