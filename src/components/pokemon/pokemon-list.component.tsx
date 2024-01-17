import Loading from '@components/loading/loading.component.tsx';
import Error from '@components/error/error.component.tsx';
import PokemonItem from './pokemon-item.component.tsx';
import useGetPokemon from 'hooks/use-get-pokemon.hook.ts';

const PokemonsList = () => {
  const { results, isError, isLoading } = useGetPokemon();

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <h1 className="text-3xl font-bold">Pokemon App</h1>

      <div className="flex flex-wrap justify-center gap-10">
        {results.map((result) => {
          const { data } = result;
          return <PokemonItem pokemon={data} key={data?.id} />;
        })}
      </div>
    </>
  );
};
export default PokemonsList;
