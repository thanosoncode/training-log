import { Workout } from '../utils/models';
import axios from './axios';

export const getWorkouts = async (): Promise<Workout[] | undefined> => {
  const response = await axios.get('/api/workouts');
  const data = await response.data;
  return data;
};

export const postWorkout = async (workout: Workout) => {
  const response = await axios.post('/api/workouts', workout);
  const data = await response.data;
  return data;
};

export const deleteWorkout = async (id: string) => {
  const response = await axios.delete(`/api/workouts/${id}`);
  const data = await response.data;
  return data;
};

export const getSingleWorkout = async (id: string): Promise<Workout | null> => {
  if (id) {
    const response = await axios.get(`/api/workouts/${id}`);
    const data = await response.data;
    return data;
  }
  return null;
};
