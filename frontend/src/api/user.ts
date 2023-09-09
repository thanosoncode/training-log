import { User, UserFromServer } from '../utils/models';
import axios from './axios';

const registerUser = async (user: User): Promise<UserFromServer> => {
  const response = await axios.post('/api/user/register', user);
  const data = await response.data;
  return data;
};

const loginUser = async (user: User): Promise<UserFromServer> => {
  const response = await axios.post('/api/user/login', user);
  const data = await response.data;
  return data;
};

const authenticateUserToken = async (token: string): Promise<UserFromServer> => {
  const response = await axios.post('/api/user/token', { token });
  const data = await response.data;
  return data;
};

export { loginUser, registerUser, authenticateUserToken };
