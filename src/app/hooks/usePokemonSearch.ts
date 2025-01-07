import { useState, useEffect } from 'react';
import { Pokemon } from "../types";

export const usePokemonSearch = (type: string, searchTerm: string) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function(){
      try {
        setLoading(true);
        let url = type 
          ? `https://pokeapi.co/api/v2/type/${type}?limit=50'`
          : 'https://pokeapi.co/api/v2/pokemon?limit=50';
        
        const response = await fetch(url);
        const data = await response.json();
        
        let pokemonList = type 
          ? data.pokemon.map((p: any) => p.pokemon)
          : data.results;
          
        // Fetch additional details for each Pokemon
        const detailedPokemon = await Promise.all(
          pokemonList.map(async (p: Pokemon) => {
            const detailsResponse = await fetch(p.url);
            const details = await detailsResponse.json();
   
            return {
              ...p,
              types: details.types.map((t: any) => t.type.name),
              sprites: details.sprites
            };
          })
        );
        
        // Filter by search term if provided
        const filteredPokemon = searchTerm
          ? detailedPokemon.filter(p => 
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : detailedPokemon;

        setPokemon(filteredPokemon);
        setError(null);
      } catch (err) {
        setError('Failed to fetch Pokemon');
      } finally {
        setLoading(false);
      }
    })();
  }, [type, searchTerm]);

  return { pokemon, loading, error };
};