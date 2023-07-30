import client from '../client/api';
import {
  GetGamesListData,
  GetGamesListParams,
  GetOneGameData,
  GetOneGameParams,
} from './gameTypes';

export const getGamesList = async (
  inputData: GetGamesListParams,
  token?: string
) => {
  const { data } = await client.get<GetGamesListData>('games', {
    params: inputData,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getOneGame = async (
  { platformUrlPath }: GetOneGameParams,
  token: string
) => {
  const { data } = await client.get<GetOneGameData>(
    `games/${platformUrlPath}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return data;
};
