import { PokemonListSchema, PokemonList } from '@schemas/pokemon.schema.ts';
import { UseQueryResult, useQuery } from 'react-query';

const Pokemons = () => {
  const getPokemon = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon')
      .then((res) => res.json())
      .then((data) => PokemonListSchema.parse(data));
  };
  const {
    data: pokemons,
    isError,
    isLoading,
  }: UseQueryResult<PokemonList> = useQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemon,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!pokemons) return <div>No data</div>;

  console.log(pokemons);
  return (
    <>
      <h1 className="text-3xl font-bold">Pokemon App</h1>
      <ul>
        {pokemons?.results?.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </>
  );
};
export default Pokemons;
