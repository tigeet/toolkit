import { useAppDispatch, useAppSelector } from "@shared/model/hooks";
import { useCallback, useEffect } from "react";

import { Pagination } from "@features/pagination";
import { PAGE_SIZE } from "../const";
import { fetchRepositoryCount } from "../model/countSlice/actions";
import { fetchPageThunk } from "../model/mainSlice/actions";
import {
  selectRepositories,
  selectPage,
  selectSearch,
} from "../model/mainSlice/selector";
import { setSearch, setPage } from "../model/mainSlice/slice";
import { selectTotal } from "../model/countSlice/selector";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { loading: areRepositoriesLoading, repositories } =
    useAppSelector(selectRepositories);
  const { total, loading: isTotalLoading } = useAppSelector(selectTotal);

  const page = useAppSelector(selectPage);
  const search = useAppSelector(selectSearch);

  useEffect(() => {
    dispatch(fetchRepositoryCount());
    dispatch(fetchPageThunk());
  }, [dispatch]);

  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setSearch(value));
      dispatch(fetchRepositoryCount());
      dispatch(fetchPageThunk());
    },
    [dispatch]
  );
  const handlePageChange = useCallback(
    (page: number) => {
      if (areRepositoriesLoading) return;
      dispatch(setPage(page));
      dispatch(fetchPageThunk());
    },
    [areRepositoriesLoading, dispatch]
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      {repositories.map((repo) => (
        <div key={repo.id}>{repo.name}</div>
      ))}

      {!isTotalLoading && (
        <Pagination
          page={page}
          onChange={handlePageChange}
          total={Math.ceil(total / PAGE_SIZE)}
        />
      )}
    </div>
  );
};

export { MainPage };
