import Loading from '@components/loading/loading.component.tsx';
import Error from '@components/error/error.component.tsx';
import { PokemonListSchema, PokemonSchema } from '@schemas/pokemon.schema.ts';
import { useQueries, useQuery } from 'react-query';

const PokemonsList = () => {
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

  const {
    data: pokemons,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemon,
    select: (result) => result.results.map((pokemon) => pokemon.name),
  });

  const results = useQueries(
    (pokemons || []).map((name) => {
      return {
        queryKey: ['pokemon', name],
        queryFn: () => getPokemonByName(name),
      };
    }),
  );

  const isLoadingAll = results.some((result) => result.isLoading);
  const isErrorAll = results.some((result) => result.isError);

  if (isLoading || isLoadingAll) return <Loading />;

  if (isError || isErrorAll) return <Error />;

  return (
    <>
      <h1 className="text-3xl font-bold">Pokemon App</h1>

      <ul>
        {results.map((result) => {
          const { data } = result;
          return (
            <li key={data?.name}>
              <h2 className="text-2xl font-bold">{data?.name}</h2>
              <img
                src={data?.sprites.front_default}
                alt={data?.name}
                className="max-w-[200px]"
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default PokemonsList;
