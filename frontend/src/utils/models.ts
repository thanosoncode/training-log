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
  userId?: string;
}

export interface StrengthWorkoutServer {
  id: string;
  label: string;
  createdAt: string;
  updatedAt: string;
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
  userId: string;
};

export type CardioWorkoutFromServer = {
  id: string;
  createdAt: string;
  updatedAt: string;
  exercise: CardioExercise;
};

export type Cardio = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  exercise: CardioExercise;
};

export type SelectedType = 'cardio' | 'strength';

export type StrengthLabel = 'Push' | 'Pull' | 'Upper Body' | 'Legs Pull' | 'Legs Push' | 'Lower Body' | 'Shoulders' | 'Calisthenics' | 'Arms';

export type StrengthExercise = {
  name: string;
  type: StrengthLabel[];
};

export type CardioLabel = 'Running' | 'Swimming' | 'Cycling' | 'Walking' | 'Hiking';

export type User = {
  email: string;
  password: string;
};

export type NotificationMessage = {
  name: string;
  open: boolean;
  severity: 'error' | 'success';
};

export type UserFromServer = {
  email: string;
  token: string;
  id: string;
};
