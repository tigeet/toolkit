export type RepositoryInfo = {
  stars: number;
  updatedAt: string;
  avatar?: string;
  languages: string[];
  hasExtraLanguages: boolean;
  description: string;
};

export type State = {
  loading: boolean;
  name?: string;
  owner?: string;
  repository?: RepositoryInfo;
};
