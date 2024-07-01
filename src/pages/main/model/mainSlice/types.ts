export type TRepository = {
  id: string;
  name: string;
  owner: string;
  stars: number;
  updatedAt?: string;
  url: string;
};

export type State = {
  search: string;
  loading: boolean;
  page: number;
  previousPage: number | null;
  endCursor: string | null;
  startCursor: string | null;
  repositories: TRepository[];
};
