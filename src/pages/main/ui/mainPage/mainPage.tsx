import {
  useAppDispatch,
  useAppSelector,
  useDebouncedDispatch,
} from "@shared/model/hooks";
import { ChangeEvent, useCallback, useEffect } from "react";
import { Pagination } from "@features/pagination";
import { PAGE_SIZE } from "../../const";
import { fetchRepositoryCount } from "../../model/countSlice/actions";
import { fetchPageThunk } from "../../model/mainSlice/actions";
import {
  selectPage,
  selectPreviousPage,
  selectRepositories,
  selectRepositoriesLoading,
  selectSearch,
} from "../../model/mainSlice/selector";
import { setSearch, setPage } from "../../model/mainSlice/slice";
import {
  selectCount,
  selectCountLoading,
} from "../../model/countSlice/selector";
import { Search } from "@features/search/";
import { cn } from "@bem-react/classname";

import "./mainPage.scss";
import { RepositoryList } from "../repositoryList/repositoryList";
const cl = cn("mainPage");

const MainPage = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const previousPage = useAppSelector(selectPreviousPage);
  const repositories = useAppSelector(selectRepositories);
  const areRepositoriesLoading = useAppSelector(selectRepositoriesLoading);
  const search = useAppSelector(selectSearch);
  const count = useAppSelector(selectCount);
  const isTotalLoading = useAppSelector(selectCountLoading);

  const dispatchFetchPage = useDebouncedDispatch();
  const dispatchFetchCount = useDebouncedDispatch();
  const fetchPage = useCallback(() => {
    if (page === previousPage) return;
    dispatchFetchPage(fetchPageThunk());
  }, [dispatchFetchPage, page, previousPage]);

  useEffect(() => {
    dispatchFetchCount(fetchRepositoryCount());
    fetchPage();
  }, [dispatch, dispatchFetchCount, fetchPage]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearch(event.target.value));

      dispatchFetchCount(fetchRepositoryCount());
      fetchPage();
    },
    [dispatch, dispatchFetchCount, fetchPage]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (areRepositoriesLoading) return;
      dispatch(setPage(page));
      fetchPage();
    },
    [areRepositoriesLoading, dispatch, fetchPage]
  );

  return (
    <main className={cl()}>
      <Search
        value={search}
        onChange={handleSearchChange}
        className={cl("search")}
        placeholder="Search"
      />

      <RepositoryList />

      {!isTotalLoading && repositories.length > 0 && (
        <Pagination
          page={page}
          onChange={handlePageChange}
          total={Math.ceil(count / PAGE_SIZE)}
        />
      )}
    </main>
  );
};

export { MainPage };
