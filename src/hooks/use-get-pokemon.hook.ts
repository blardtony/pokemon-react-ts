import { PokemonListSchema, PokemonSchema } from '@schemas/pokemon.schema';
import { useQueries, useQuery } from 'react-query';

const offset = (page: number, limit: number) => (page - 1) * limit;

const getPokemon = async (page: number, limit: number) => {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=' +
      limit +
      '&offset=' +
      offset(page, limit),
  );
  const data = await res.json();
  return PokemonListSchema.parse(data);
};
const getPokemonByName = async (name: string) => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
  const data = await res.json();
  return PokemonSchema.parse(data);
};

const useGetPokemon = (page: number, limit: number) => {
  const { data } = useQuery({
    queryKey: ['pokemons', page],
    queryFn: () => getPokemon(page, limit),
    keepPreviousData: true,
  });
  const isPreviousData = data?.previous;
  const isNextData = data?.next;
  const pokemons = data?.results.map((pokemon) => pokemon.name);

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
  return { results, isError, isLoading, isPreviousData, isNextData };
};

export default useGetPokemon;
