import client from '../client/api';

export const handleLogin = async (input: {
  username: string;
  password: string;
}): Promise<{ token: string; expiresAt: string }> => {
  const { data } = await client.post<{
    data: { token: string; expiresAt: string };
  }>('users/log-in', input);

  return data.data;
};

export const handleLogout = async () => {};
