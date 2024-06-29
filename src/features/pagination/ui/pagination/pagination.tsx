import { memo, useMemo } from "react";
import { cn } from "@bem-react/classname";
import "./pagination.scss";
import ChevronLeft from "@shared/assets/chevron-left.svg?react";
import ChevronRight from "@shared/assets/chevron-right.svg?react";
type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
};
const LIMIT = 5;

const createIncreasingSequence = (start: number, length: number) =>
  Array(length)
    .fill(0)
    .map((_, i) => start + i);

const findSiblings = (index: number, total: number): number[] => {
  const limit = Math.min(LIMIT, total);
  if (index < Math.ceil(limit / 2)) {
    return createIncreasingSequence(1, limit);
  }

  if (total - index < Math.ceil(limit / 2)) {
    return createIncreasingSequence(total - limit + 1, limit);
  }

  return createIncreasingSequence(index - Math.floor(limit / 2), limit);
};

const cl = cn("pagination");
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
        <span
          className={cl("tag", { selected: value === page })}
          key={value}
          onClick={() => value && handleClick(value)}
        >
          {value}
        </span>
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
