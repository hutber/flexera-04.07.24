import axios from 'axios';

import config from '@/app/config';

export interface RepositoryOwner {
  login: string;
  id: number;
  avatar_url: string;
}

export interface Repository {
  id: string;
  full_name: string;
  description: string;
  owner: RepositoryOwner;
}

export interface FetchReposResponse {
  items: Repository[];
  totalCount: number;
}

export const fetchData = async (
  url: string,
  headers: object = { 'User-Agent': 'request' },
) => {
  const { data } = await axios.get(url, { headers });
  return data;
};

export const fetchRepos = async (
  page: number,
  perPage: number,
): Promise<FetchReposResponse> => {
  try {
    const url = `${config.api.baseUrl}/search/repositories?sort=stars&q=javascript&per_page=${perPage}&page=${page}`;
    const data = await fetchData(url);
    return { items: data.items, totalCount: data.total_count };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return { items: [], totalCount: 0 };
    }
    throw error;
  }
};
