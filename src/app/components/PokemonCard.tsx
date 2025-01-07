
import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "../types";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="block p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white"
    >
      <div className="flex flex-col items-center">
        {pokemon.sprites?.front_default && (
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-40 h-40 object-contain"
            width="100"
            height="100"
          />
        )}
        <div className="text-left w-full">
        <h2 className="text-xl text-[#1B365C] capitalize font-semibold mb-4">
          {pokemon.name}
        </h2>
        <div className="text-blue-500 hover:text-blue-600 transition-colors">
         {"Details >"}
        </div>
        </div>
      </div>
    </Link>
  );
}
