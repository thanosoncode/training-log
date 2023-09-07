import { StrengthWorkoutServer, Workout } from '../utils/models';
import axios from './axios';

export const getAllStrength = async ({ month, year, userId }: { month: number; year: number; userId: string }): Promise<StrengthWorkoutServer[]> => {
  console.log('userid in', userId);
  const response = await axios.post(`/api/strength?month=${month.toString()}&year=${year.toString()}`, { userId });
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
