import { StrengthWorkoutServer, Workout } from '../utils/models';
import axios from './axios';

export const getAllStrength = async ({
  month,
  year,
  userId,
  skip,
  take
}: {
  month: number;
  year: number;
  userId: string;
  skip: number;
  take: number;
}): Promise<StrengthWorkoutServer[]> => {
  const response = await axios.post(`/api/strength?month=${month.toString()}&year=${year.toString()}&skip=${skip.toString()}&take=${take.toString()}`, {
    userId
  });
  const data = await response.data;
  return data;
};

export const postWorkoutStrength = async (workout: Workout) => {
  const response = await axios.post('/api/strength/new', workout);
  const data = await response.data;
  return data;
};

export const deleteWorkoutStrength = async (id: string) => {
  const response = await axios.delete(`/api/strength/${id}`);
  const data = await response.data;
  return data;
};

export const getSingleWorkoutStrength = async (id: string): Promise<StrengthWorkoutServer | null> => {
  if (id) {
    const response = await axios.get(`/api/strength/${id}`);
    const data = await response.data;
    return data;
  }
  return null;
};

export const countAllStrength = async () => {
  const response = await axios.get('/api/strength/');
  const data = await response.data;
  return data;
};
