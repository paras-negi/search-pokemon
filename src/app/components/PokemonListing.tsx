'use client';
import {useState} from "react";
import {usePokemonSearch} from "../hooks/usePokemonSearch";
import SearchForm from "./SearchForm";
import PokemonCard from "./PokemonCard";


export default function PokemonListing({ types }: { types: string[] }) {
  const [filters, setFilters] = useState({ type: '', search: '' });
  const { pokemon, loading, error } = usePokemonSearch(filters.type, filters.search);

  return (
    <>
      <SearchForm
        types={types}
        onSearch={(type, search) => setFilters({ type, search })}
      />
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pokemon.map((p) => (
          <PokemonCard key={p.name} pokemon={p} />
        ))}
      </div>
    </>
  );
}