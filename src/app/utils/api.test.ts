import axios from 'axios';
import config from '@/app/config';
import { fetchData, fetchRepos } from '@/app/utils/api';
import { FetchReposResponse } from '@/app/types/apis';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Utils', () => {
  describe('fetchData', () => {
    it('should fetch data successfully', async () => {
      const url = 'https://api.github.com/some-endpoint';
      const responseData = { data: { items: [], total_count: 0 } };
      mockedAxios.get.mockResolvedValue(responseData);

      const data = await fetchData(url);
      expect(data).toEqual(responseData.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(url, {
        headers: { 'User-Agent': 'request' },
      });
    });
  });

  describe('fetchRepos', () => {
    const page = 1;
    const perPage = 10;

    it('should fetch repositories successfully', async () => {
      const url = `${config.api.baseUrl}/search/repositories?sort=stars&q=javascript&per_page=${perPage}&page=${page}`;
      const responseData = {
        data: {
          items: [
            {
              id: '1',
              full_name: 'repo',
              description: 'desc',
              html_url: 'url',
              owner: { login: 'owner', id: 1, avatar_url: 'avatar' },
            },
          ],
          total_count: 1,
        },
      };
      mockedAxios.get.mockResolvedValue(responseData);

      const result: FetchReposResponse = await fetchRepos(page, perPage);
      expect(result).toEqual({
        items: responseData.data.items,
        totalCount: responseData.data.total_count,
      });
      expect(mockedAxios.get).toHaveBeenCalledWith(url, {
        headers: { 'User-Agent': 'request' },
      });
    });

    it('should handle 422 error and return empty items', async () => {
      // more tests to check if we're failing
    });
  });
});
