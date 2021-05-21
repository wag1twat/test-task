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
  modified: string;
  name: string;
  resourceURI: string;
  series: BaseCharacterEntity<CharacterItem>;
  stories: BaseCharacterEntity<CharacterItem>;
  thumbnail: { path: string; extension: string };
  urls: { type: string; url: string }[];
}

export type { Character, CharacterQueries };
