import { PokemonDetails } from "@/app/types";
import Link from "next/link";
// import Breadcrumb from "@/app/components/BreadCrumbs";

async function getPokemonDetails(name: string): Promise<PokemonDetails> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon");
  return res.json();
}

export default async function PokemonDetail({ params }: { params: { name: string } }) {
  const { name } = await params;  
  const pokemon = await getPokemonDetails(name);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl bg-[#e5e7eb]">
      <Link className="mb-8" href="/">
        <div className="text-[#61e2c9] hover:text-[#7acc91] transition-colors font-bold mb-8">
          {"< Back"}
        </div>
      </Link>

      <div className=" w-full flex flex-col md:flex-column  items-end">
        <div className="rounded-2xl md:w-1/2 overflow-hidden ">
          <div className="">
            <div className="bg-[#61e2c9] p-8 flex items-center justify-center">
              <img
                src={pokemon.sprites?.front_default}
                alt={pokemon.name}
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>

          {/* Right side - Details */}
          <div className="bg-[#fec668] p-8 ">
            <div className="space-y-4">
              <div>
                <span className="font-medium">
                  <strong>Name:</strong>
                </span>{" "}
                <span className="capitalize">{pokemon.name}</span>
              </div>

              <div>
                <span className="font-medium">
                  <strong>Type:</strong>
                </span>{" "}
                <span className="capitalize">
                  {pokemon.types
                    ?.map((poketype: any) => poketype.type.name)
                    .join(", ")}
                </span>
              </div>

              <div>
                <span className="font-medium">
                  <strong>Stats:</strong>
                </span>{" "}
                <span className="capitalize">
                  {pokemon.stats.map((stat) => stat.stat.name).join(", ")}
                </span>
              </div>

              <div>
                <span className="font-medium">
                  <strong>Abilities:</strong>
                </span>{" "}
                <span className="capitalize">
                  {pokemon.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </span>
              </div>

              <div>
                <span className="font-medium">
                  <strong>Some Moves:</strong>
                </span>{" "}
                <span className="capitalize">
                  {pokemon.moves
                    ?.slice(0, 5)
                    .map((move: any) => move.move.name)
                    .join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
