import { SerializedError } from "@reduxjs/toolkit";

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
  error?: SerializedError;
  name: string;
  owner: string;
  repository: RepositoryInfo;
};
