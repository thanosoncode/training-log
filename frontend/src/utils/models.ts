export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

export interface Workout {
  id?: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
  exercises: Exercise[];
}

export type ExerciseWithVolumeAndDate = {
  name: string;
  volume: number;
  sets: string;
  reps: string;
  weight: string;
  createdAt: string;
};

export type VolumePerExercise = {
  name: string;
  volume: number;
  sets: number;
  reps: number;
  weight: number;
  createdAt: string;
};

export type TopWeigtPerExercise = {
  name: string;
  topWeight: number;
  createdAt: string;
};

export type CardioExercise = {
  name: string;
  minutes: string;
  distance: string;
};

export type Cardio = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  exercise: CardioExercise;
};
