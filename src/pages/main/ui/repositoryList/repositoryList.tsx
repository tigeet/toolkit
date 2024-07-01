import { Repository } from "@entities/repository";
import { PAGE_SIZE } from "@pages/main/const";
import { Skeleton } from "@shared/ui/skeleton/skeleton";
import { memo } from "react";
import { cn } from "@bem-react/classname";

import "./repositoryList.scss";
import {
  selectRepositories,
  selectRepositoriesLoading,
} from "@pages/main/model/mainSlice/selector";
import { useAppSelector } from "@shared/model/hooks";
const cl = cn("repositoryList");

export const RepositoryList = memo(() => {
  const repositories = useAppSelector(selectRepositories);
  const loading = useAppSelector(selectRepositoriesLoading);
  if (loading) {
    return (
      <div className={cl()}>
        {Array(PAGE_SIZE)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} width="100%" height={77} />
          ))}
      </div>
    );
  }

  if (!repositories.length) {
    return (
      <div className={cl({ empty: true })}>
        <span className={cl("emptyMessage")}>
          По вашему запросу ничего не найдено
        </span>
      </div>
    );
  }
  return (
    <div className={cl()}>
      {repositories.map(({ id, name, owner, updatedAt, url, stars }) => (
        <Repository
          key={id}
          owner={owner}
          name={name}
          url={url}
          updatedAt={updatedAt}
          stars={stars}
        />
      ))}
    </div>
  );
});
