import Loading from '@components/loading/loading.component.tsx';
import Error from '@components/error/error.component.tsx';
import PokemonItem from './pokemon-item.component.tsx';
import useGetPokemon from 'hooks/use-get-pokemon.hook.ts';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PokemonsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );
  const { results, isError, isLoading, isPreviousData, isNextData } =
    useGetPokemon(page);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  const nextPage = () => {
    if (!isNextData) return;
    setPage(page + 1);
    setSearchParams({ page: String(page + 1) });
  };

  const previousPage = () => {
    if (!isPreviousData) return;
    setPage(page - 1);
    setSearchParams({ page: String(page - 1) });
  };
  return (
    <>
      <h1 className="text-3xl font-bold">Pokemon App</h1>

      <div className="flex flex-wrap justify-center gap-10">
        {results.map((result) => {
          const { data } = result;
          return <PokemonItem pokemon={data} key={data?.id} />;
        })}
      </div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => previousPage()}
        disabled={!isPreviousData}
      >
        Previous page
      </button>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => nextPage()}
        disabled={!isNextData}
      >
        Next page
      </button>
    </>
  );
};
export default PokemonsList;
