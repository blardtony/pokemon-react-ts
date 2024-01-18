import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get('limit')) || 20,
  );
  const next = (isNextData: boolean) => {
    if (!isNextData) return;
    setPage(page + 1);
    setSearchParams({ page: String(page + 1), limit: String(limit) });
  };

  const previous = (isPreviousData: boolean) => {
    if (!isPreviousData) return;
    setPage(page - 1);
    setSearchParams({ page: String(page - 1), limit: String(limit) });
  };
  const changeLimit = (limit: number) => {
    setLimit(limit);
    setSearchParams({ limit: String(limit) });
  };
  return {
    page,
    limit,
    changeLimit,
    next,
    previous,
  };
};

export default usePagination;
