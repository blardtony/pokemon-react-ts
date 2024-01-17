import { PokemonListSchema, PokemonSchema } from '@schemas/pokemon.schema';
import { useQueries, useQuery } from 'react-query';

const getPokemon = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await res.json();
  return PokemonListSchema.parse(data);
};
const getPokemonByName = async (name: string) => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
  const data = await res.json();
  return PokemonSchema.parse(data);
};

const useGetPokemon = () => {
  const { data: pokemons } = useQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemon,
    select: (result) => result.results.map((pokemon) => pokemon.name),
  });

  const results = useQueries(
    (pokemons || []).map((name) => {
      return {
        queryKey: ['pokemon', name],
        queryFn: () => getPokemonByName(name),
        enabled: !!name,
      };
    }),
  );
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  return { results, isError, isLoading };
};

export default useGetPokemon;
