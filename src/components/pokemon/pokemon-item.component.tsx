import { PokemonType } from '@schemas/pokemon.schema';
import PokemonTypeComponent from './pokemon-type.component';

const PokemonItem = ({ pokemon }: { pokemon: PokemonType | undefined }) => {
  if (!pokemon) return null;
  console.log(pokemon.types);
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72">
      <div className="relative h-32 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={pokemon.sprites.front_default}
          alt="card-image"
          className="w-full h-full object-contain object-center"
        />
      </div>
      <div className="p-6">
        <h3 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 capitalize">
          {pokemon.name}
        </h3>
        <div className="flex gap-2 flex-wrap">
          {pokemon.types.map((type) => (
            <PokemonTypeComponent key={type.type.name} type={type.type.name} />
          ))}
        </div>
      </div>
      <div className="p-6 pt-0">
        <a
          className="cursor-pointer select-none font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none"
          type="button"
        >
          Détails
        </a>
      </div>
    </div>
  );
};

export default PokemonItem;
