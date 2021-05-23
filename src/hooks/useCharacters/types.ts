interface CharacterQueries {
  name: string;
  nameStartsWith: string;
  modifiedSince: Date;
  comics: number[];
  series: number[];
  events: number[];
  stories: number[];
  orderBy: string;
  limit: number;
  offset: number;
}

interface BaseCharacterEntity<T = any> {
  available: number;
  collectionURI: string;
  items: T[];
  returned: number;
}

interface CharacterItem {
  name: string;
  resourceURI: string;
}

interface Character {
  comics: BaseCharacterEntity<CharacterItem>;
  description: string;
  events: BaseCharacterEntity<CharacterItem>;
  id: number;
  modified: Date;
  name: string;
  resourceURI: string;
  series: BaseCharacterEntity<CharacterItem>;
  stories: BaseCharacterEntity<CharacterItem>;
  thumbnail: { path: string; extension: string };
  urls: { type: string; url: string }[];
}

interface CharactersDataResponse {
  count: number;
  limit: number;
  offset: number;
  results: Character[];
  total: number;
}

interface CharactersResponse {
  attributionHTML: string;
  attributionText: string;
  code: number;
  copyright: string;
  data: CharactersDataResponse;
  etag: string;
  status: string;
}

export type { Character, CharacterQueries, CharactersResponse };
