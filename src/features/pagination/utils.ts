import { LIMIT } from "./const";

const createIncreasingSequence = (start: number, length: number) =>
  Array(length)
    .fill(0)
    .map((_, i) => start + i);

export const findSiblings = (index: number, total: number): number[] => {
  const limit = Math.min(LIMIT, total);
  if (index < Math.ceil(limit / 2)) {
    return createIncreasingSequence(1, limit);
  }

  if (total - index < Math.ceil(limit / 2)) {
    return createIncreasingSequence(total - limit + 1, limit);
  }

  return createIncreasingSequence(index - Math.floor(limit / 2), limit);
};
