import { CardioWorkoutFromServer, CardioExercise } from '../utils/models';
import axios from './axios';

export const getAllCardio = async ({ month, year, userId }: { month: number; year: number; userId: string }): Promise<CardioWorkoutFromServer[]> => {
  const response = await axios.post(`/api/cardio?month=${month.toString()}&year=${year.toString()}`, { userId });
  const data = await response.data;
  return data;
};

export const postCardio = async (exersice: CardioExercise): Promise<CardioWorkoutFromServer> => {
  const response = await axios.post('/api/cardio/new', exersice);
  const data = await response.data;
  return data;
};

export const deleteCardio = async (id: string): Promise<CardioWorkoutFromServer> => {
  const response = await axios.delete(`/api/cardio/${id}`);
  const data = await response.data;
  return data;
};

export const getSingleCardio = async (id: string): Promise<CardioWorkoutFromServer | null> => {
  if (id) {
    const response = await axios.get(`/api/cardio/${id}`);
    const data = await response.data;
    return data;
  }
  return null;
};
