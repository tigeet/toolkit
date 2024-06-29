import { cn } from "@bem-react/classname";
import { formatDate } from "@shared/utils";

import "./updatedAt.scss";
const cl = cn("updatedAt");

type Props = {
  date?: Date | string;
};

export const UpdatedAt = ({ date }: Props) => {
  return <span className={cl()}>Updated at {date && formatDate(date)}</span>;
};
