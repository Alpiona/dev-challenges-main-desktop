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

export const handleUserRegister = async (input: {
  username: string;
  password: string;
  passwordConfirmation: string;
  email: string;
}) => {
  const { data } = await client.post('users', input);

  return data.data;
};

export const handleLogout = async () => {};
