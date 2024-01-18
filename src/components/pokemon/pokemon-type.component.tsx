const PokemonTypeComponent = ({ type }: { type: string }) => {
  const getColorTypes: { [key: string]: string } = {
    grass: 'bg-green-400',
    poison: 'bg-purple-400',
    fire: 'bg-red-400',
    water: 'bg-blue-400',
    bug: 'bg-green-400',
    normal: 'bg-gray-400',
    flying: 'bg-blue-400',
    electric: 'bg-yellow-400',
    ground: 'bg-yellow-400',
    fairy: 'bg-pink-400',
    fighting: 'bg-red-400',
    psychic: 'bg-purple-400',
    rock: 'bg-gray-400',
    steel: 'bg-gray-400',
    ice: 'bg-blue-400',
    ghost: 'bg-purple-400',
    dragon: 'bg-red-400',
  };
  return (
    <div
      key={type}
      className={`inline-block select-none whitespace-nowrap rounded-lg py-1.5 px-3 text-xs font-bold uppercase text-white ${getColorTypes[type] ?? 'bg-gray-400'}`}
    >
      <span className="">{type}</span>
    </div>
  );
};

export default PokemonTypeComponent;
