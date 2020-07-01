export interface XIVOptions {
  /**
   * The XIV API Key.
   *
   * @see https://xivapi.com
   */
  xivapi?: (null|string);
}

export interface Pagination {
  /**
   * The current page number.
   */
  Page: number;

  /**
   * The next page number.
   */
  PageNext: (null|number);

  /**
   * The previous page number.
   */
  PagePrev: (null|number);

  /**
   * The total number of pages.
   */
  PageTotal: number;

  /**
   * The number of results returned.
   */
  Results: number;

  /**
   * The maximum number of results per-page
   */
  ResultsPerPage: number;

  /**
   * The total number of results across all pages.
   */
  ResultsTotal: number;
}

export interface PaginatedResponse<T> {
  Pagination: Pagination;

  Results: T[];
}

export type DataCenters = ('Aether'|'Chaos'|'Crystal'|'Elemental'|'Gaia'|'Light'|'Mana'|'Primal');
export type Servers = ('Adamantoise'|'Aegis'|'Alexander'|'Anima'|'Asura'|'Atomos'|'Bahamut'|'Balmung'|'Behemoth'|'Belias'|'Brynhildr'|'Cactuar'|'Carbuncle'|'Cerberus'|'Chocobo'|'Coeurl'|'Diabolos'|'Durandal'|'Excalibur'|'Exodus'|'Faerie'|'Famfrit'|'Fenrir'|'Garuda'|'Gilgamesh'|'Goblin'|'Gungnir'|'Hades'|'Hyperion'|'Ifrit'|'Ixion'|'Jenova'|'Kujata'|'Lamia'|'Leviathan'|'Lich'|'Louisoix'|'Malboro'|'Mandragora'|'Masamune'|'Mateus'|'Midgardsormr'|'Moogle'|'Odin'|'Omega'|'Pandaemonium'|'Phoenix'|'Ragnarok'|'Ramuh'|'Ridill'|'Sargatanas'|'Shinryu'|'Shiva'|'Siren'|'Tiamat'|'Titan'|'Tonberry'|'Typhon'|'Ultima'|'Ultros'|'Unicorn'|'Valefor'|'Yojimbo'|'Zalera'|'Zeromus'|'Zodiark'|'Spriggan'|'Twintania')
