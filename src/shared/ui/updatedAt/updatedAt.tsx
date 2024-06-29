import { cn } from "@bem-react/classname";

import "./updatedAt.scss";
import { Skeleton } from "../skeleton/skeleton";
import { formatDate } from "@shared/utils";
const cl = cn("updatedAt");

type Props = {
  date?: Date | string;
  loading?: boolean;
};

export const UpdatedAt = ({ date, loading }: Props) => {
  if (loading)
    return (
      <span className={cl()}>
        Updated at <Skeleton height={16} width={100} />
      </span>
    );

  if (!date) {
    return <span className={cl({ empty: true })}>No Commits</span>;
  }

  return <span className={cl()}>Updated at {formatDate(date)}</span>;
};
