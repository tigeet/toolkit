import { useAppDispatch, useAppSelector } from "@shared/model/hooks";
import { ChangeEvent, useCallback, useEffect } from "react";

import { Pagination } from "@features/pagination";
import { PAGE_SIZE } from "../const";
import { fetchRepositoryCount } from "../model/countSlice/actions";
import { fetchPageThunk } from "../model/mainSlice/actions";
import { selectRepositories } from "../model/mainSlice/selector";
import { setSearch, setPage } from "../model/mainSlice/slice";
import { selectTotal } from "../model/countSlice/selector";
import { Search } from "@features/search/ui/search/search";
import { Repository } from "@entities/repository/ui/repository/repository";
import { cn } from "@bem-react/classname";
import "./mainPage.scss";
const cl = cn("mainPage");
const MainPage = () => {
  const dispatch = useAppDispatch();
  const {
    loading: areRepositoriesLoading,
    repositories,
    page,
    previousPage,
    search,
  } = useAppSelector(selectRepositories);
  const { total, loading: isTotalLoading } = useAppSelector(selectTotal);

  const fetchPage = useCallback(() => {
    if (page === previousPage) return;
    dispatch(fetchPageThunk());
  }, [dispatch, page, previousPage]);
  useEffect(() => {
    dispatch(fetchRepositoryCount());
    fetchPage();
  }, [dispatch, fetchPage]);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearch(event.target.value));
      dispatch(fetchRepositoryCount());
      fetchPage();
    },
    [dispatch, fetchPage]
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
      />

      <div className={cl("list")}>
        {repositories.map(({ id, name, owner, updatedAt, url, stars }) => (
          <Repository
            key={id}
            owner={owner}
            name={name}
            url={url}
            updatedAt={new Date(updatedAt)}
            stars={stars}
          />
        ))}
      </div>

      {!isTotalLoading && (
        <Pagination
          page={page}
          onChange={handlePageChange}
          total={Math.ceil(total / PAGE_SIZE)}
        />
      )}
    </main>
  );
};

export { MainPage };
