import StarIcon from "@shared/assets/star.svg?react";
import { cn } from "@bem-react/classname";

import "./stars.scss";
const cl = cn("stars");
type Props = {
  count: number;
};

export const Stars = ({ count }: Props) => {
  return (
    <div className={cl()}>
      <StarIcon className={cl("icon")} />
      <span className={cl("count")}>{count}</span>
    </div>
  );
};
