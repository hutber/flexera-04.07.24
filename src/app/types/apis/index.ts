export interface RepositoryOwner {
  login: string;
  id: number;
  avatar_url: string;
}

export interface Repository {
  id: string;
  full_name: string;
  description: string;
  html_url: string;
  owner: RepositoryOwner;
}

export interface FetchReposResponse {
  items: Repository[];
  totalCount: number;
}
