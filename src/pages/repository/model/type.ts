export type RepositoryInfo = {
  stars: number;
  updatedAt: string;
  avatarUrl?: string;
  ownerUrl: string;
  languages: string[];
  totalLanguages: number;
  description: string;
};

export type State = {
  loading: boolean;
  name: string;
  owner: string;
  repository: RepositoryInfo;
};
