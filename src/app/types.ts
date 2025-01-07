export interface Pokemon {
    name: string;
    url: string;
    types?: string[];
    sprites?: {
      front_default: string;
    };
  }

export interface PokemonDetails extends Pokemon {
    height: number;
    weight: number;
    abilities: Array<{
      ability: {
        name: string;
      };
    }>;
    stats: Array<{
      base_stat: number;
      stat: {
        name: string;
      };
    }>;
    moves: Array<{
      move: {
        name: string;
      };
    }>;
  }