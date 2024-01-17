import { PokemonListSchema, PokemonSchema } from '@schemas/pokemon.schema';
import { useQueries, useQuery } from 'react-query';

const getPokemon = () => {
  return fetch('https://pokeapi.co/api/v2/pokemon')
    .then((res) => res.json())
    .then((data) => PokemonListSchema.parse(data));
};
const getPokemonByName = (name: string) => {
  return fetch('https://pokeapi.co/api/v2/pokemon/' + name)
    .then((res) => res.json())
    .then((data) => PokemonSchema.parse(data));
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
