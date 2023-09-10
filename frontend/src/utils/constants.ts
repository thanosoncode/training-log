import { CardioLabel, StrengthExercise, StrengthLabel } from './models';

export const LONG_CACHE = 3600000;
export const STRENGTH_COLOR = '#7AC0F7';
export const CARDIO_COLOR = '#a9d6a9';

export const strengthLabels: StrengthLabel[] = ['Push', 'Pull', 'Upper Body', 'Lower Body', 'Shoulders', 'Calisthenics', 'Arms'];

export const cardioLabels: CardioLabel[] = ['Running', 'Swimming', 'Cycling', 'Walking', 'Hiking'];

export const strengthExercises: StrengthExercise[] = [
  { name: 'Overhead Shoulder Press', type: ['Push', 'Shoulders', 'Arms', 'Upper Body'] },
  { name: 'Incline Bench', type: ['Push', 'Upper Body'] },
  { name: 'Flat Bench', type: ['Push', 'Upper Body'] },
  { name: 'Dumbell Shoulder Press', type: ['Push', 'Shoulders', 'Upper Body'] },
  { name: 'Tricep Extensions', type: ['Push', 'Shoulders', 'Arms', 'Upper Body'] },
  { name: 'Dips', type: ['Push', 'Shoulders', 'Arms', 'Upper Body'] },
  { name: 'Lateral Raises', type: ['Push', 'Shoulders', 'Arms', 'Upper Body'] },
  { name: 'Pull Ups', type: ['Pull', 'Upper Body'] },
  { name: 'Chin Ups', type: ['Pull', 'Upper Body'] },
  { name: 'Pull Downs', type: ['Pull', 'Upper Body'] },
  { name: 'Dumbell Rows', type: ['Pull', 'Upper Body', 'Shoulders'] },
  { name: 'Barbell Rows', type: ['Pull', 'Upper Body', 'Shoulders'] },
  { name: 'Incline Rows', type: ['Pull', 'Upper Body', 'Shoulders'] },
  { name: 'Rear Delt Flyes', type: ['Pull', 'Upper Body', 'Arms'] },
  { name: 'Face Pulls', type: ['Pull', 'Upper Body', 'Arms'] },
  { name: 'Bicep Curls', type: ['Arms', 'Upper Body'] },
  { name: 'Hammer Curls', type: ['Arms', 'Upper Body'] },
  { name: 'Bulgarian Split Squats', type: ['Lower Body'] },
  { name: 'Trap Deadlifts', type: ['Lower Body'] },
  { name: 'Deadlifts', type: ['Lower Body'] },
  { name: 'Romanian Deadlifts', type: ['Lower Body'] },
  { name: 'Lunges', type: ['Lower Body'] },
  { name: 'Hack Squat', type: ['Lower Body'] },
  { name: 'Back Squat', type: ['Lower Body'] },
  { name: 'Front Squat', type: ['Lower Body'] },
  { name: 'Leg Extensions', type: ['Lower Body'] },
  { name: 'Hamstring Curls', type: ['Lower Body'] },
  { name: 'Hip Thrust', type: ['Lower Body'] },
  { name: 'Ghd', type: ['Lower Body'] }
];

export const Months = [
  { name: 'January', value: 0 },
  { name: 'February', value: 1 },
  { name: 'March', value: 2 },
  { name: 'April', value: 3 },
  { name: 'May', value: 4 },
  { name: 'June', value: 5 },
  { name: 'July', value: 6 },
  { name: 'August', value: 7 },
  { name: 'Semptember', value: 8 },
  { name: 'October', value: 9 },
  { name: 'November', value: 10 },
  { name: 'December', value: 11 }
];
