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
  if (index < limit) {
    return createIncreasingSequence(1, limit);
  }

  if (index + limit > total + 1) {
    return createIncreasingSequence(total - limit + 1, limit);
  }

  return createIncreasingSequence(index - Math.floor(limit / 2 - 1), limit - 2);
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
  const handleClick = (value: number) => onChange(value);

  const displayedValues = useMemo(
    () => findSiblings(page, total),
    [page, total]
  );

  const displayFirst = displayedValues[0] !== 1;
  const displayLast = displayedValues.at(-1) !== total;
  return (
    <div className={cl()}>
      <button
        className={cl("button", { disabled: page === 1 })}
        disabled={page === 1}
        onClick={handleClickPrev}
      >
        <ChevronLeft className={cl("icon")} />
      </button>
      {displayFirst && (
        <>
          <span
            className={cl("tag", { selected: page === 1 })}
            key={1}
            onClick={() => handleClick(1)}
          >
            1
          </span>

          <span className={cl("dots")}>...</span>
        </>
      )}

      {displayedValues.map((value) => (
        <span
          className={cl("tag", { selected: value === page })}
          key={value}
          onClick={() => value && handleClick(value)}
        >
          {value}
        </span>
      ))}

      {displayLast && (
        <>
          <span className={cl("dots")}>...</span>
          <span
            key={total}
            className={cl("tag", { selected: page === total })}
            onClick={() => handleClick(total)}
          >
            {total}
          </span>
        </>
      )}
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
