import MockAdapter from 'axios-mock-adapter';
import { service } from './service';
import { fetchDataRepositori, fetchDataUser } from './hooks/useFetch';
import { RESPONSE_USER_GITHUB, RESPONSE_REPOSSITORI_GITHUB } from './utils/mockResponse';
import env from './config/env';

describe('Test Fetch Api', () => {
  test('Api get User By Mocking', async () => {
    const mock = new MockAdapter(service);
    const url = `${env.apiBaseURL}/search/users`;
    mock.onGet(url).reply(200, RESPONSE_USER_GITHUB);
    const params = {
      q: 'esaputra'
    };
    const { error, data } = await fetchDataUser('search/users', params);
    expect(error).toBe(null);
    expect(Array.isArray(data)).toBe(true);
  });

  test('Api get User By Fetching API Github', async () => {
    const params = {
      q: 'esaputra'
    };
    const { error, data } = await fetchDataUser('search/users', params);
    expect(error).toBe(null);
    expect(Array.isArray(data)).toBe(true);
  });

  test('Api get Repossitori By Mocking', async () => {
    const mock = new MockAdapter(service);
    const url = `${env.apiBaseURL}/users/esaputra95/repos`;
    mock.onGet(url).reply(200, RESPONSE_REPOSSITORI_GITHUB);
    const { error, data } = await fetchDataRepositori(`users/esaputra95/repos`);
    expect(error).toBe(null);
    expect(Array.isArray(data)).toBe(true);
  });

  test('Api get Repossitori By Fetching API Github', async () => {
    const { error, data } = await fetchDataRepositori(`users/esaputra95/repos`);
    expect(error).toBe(null);
    expect(Array.isArray(data)).toBe(true);
  });
});