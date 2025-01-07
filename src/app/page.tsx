import { Suspense } from 'react';
import PokemonListing from "./components/PokemonListing";

async function getTypes() {
  const res = await fetch('https://pokeapi.co/api/v2/type');
  const data = await res.json();
  return data.results.map((type: any) => type.name);
}

export default async function Home() {
  const types = await getTypes();

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl bg-[#e5e7eb]">
      <h1 className="text-4xl font-bold mb-12 text-[#1B365C]">Pokemon Search</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonListing types={types} />
      </Suspense>
    </main>
  );
}
