export type Repository = {
  id: string;
  name: string;
  owner: {
    login: string;
  };
  stars: number;
  lastCommit: Date;
  url: string;
};

export type State = {
  search: string;
  loading: boolean;
  page: number;
  repositories: Repository[];
};
