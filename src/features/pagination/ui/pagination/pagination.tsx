import { memo, useMemo } from "react";
import { cn } from "@bem-react/classname";
import ChevronLeft from "@shared/assets/chevron-left.svg?react";
import ChevronRight from "@shared/assets/chevron-right.svg?react";
import { findSiblings } from "@features/pagination/utils";

import "./pagination.scss";
const cl = cn("pagination");

type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
};

export const Pagination = memo(({ page, total, onChange }: Props) => {
  const handleClickPrev = () => {
    if (page === 1) return;
    onChange(page - 1);
  };

  const handleClickNext = () => {
    if (page === total) return;
    onChange(page + 1);
  };

  const handleClick = (value: number) => {
    if (value === page) return;
    onChange(value);
  };

  const displayedValues = useMemo(
    () => findSiblings(page, total),
    [page, total]
  );

  return (
    <div className={cl()}>
      <button
        className={cl("button", { disabled: page === 1 })}
        disabled={page === 1}
        onClick={handleClickPrev}
      >
        <ChevronLeft className={cl("icon")} />
      </button>

      {displayedValues.map((value) => (
        <button
          className={cl("tag", { selected: value === page })}
          key={value}
          onClick={() => value && handleClick(value)}
        >
          {value}
        </button>
      ))}

      <button
        className={cl("button", { disabled: page === total })}
        disabled={page === total}
        onClick={handleClickNext}
      >
        <ChevronRight className={cl("icon")} />
      </button>
    </div>
  );
});
