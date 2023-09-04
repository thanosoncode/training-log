import { CardioLabel, StrengthExercise, StrengthLabel } from './models';

export const LONG_CACHE = 3600000;
export const STRENGTH_COLOR = '#7AC0F7';
export const CARDIO_COLOR = '#a9d6a9';

export const strengthLabels: StrengthLabel[] = ['Push', 'Pull', 'Upper Body', 'Legs Pull', 'Legs Push', 'Lower Body', 'Shoulders', 'Calisthenics', 'Arms'];

export const cardioLabels: CardioLabel[] = ['Running', 'Swimming', 'Cycling', 'Walking', 'Hiking'];

export const strengthExercises: StrengthExercise[] = [
  { name: 'Overhead Shoulder Press', type: ['Push', 'Shoulders', 'Arms'] },
  { name: 'Incline Bench', type: ['Push'] },
  { name: 'Flat Bench', type: ['Push'] },
  { name: 'Dumbell Shoulder Press', type: ['Push', 'Shoulders'] },
  { name: 'Tricep Extensions', type: ['Push', 'Shoulders', 'Arms'] },
  { name: 'Dips', type: ['Push', 'Shoulders', 'Arms'] },
  { name: 'Lateral Raises', type: ['Push', 'Shoulders', 'Arms'] },
  { name: 'Pull Ups', type: ['Pull', 'Upper Body'] },
  { name: 'Chin Ups', type: ['Pull', 'Upper Body'] },
  { name: 'Dumbell Rows', type: ['Pull', 'Upper Body'] },
  { name: 'Barbell Rows', type: ['Pull', 'Upper Body'] },
  { name: 'Incline Rows', type: ['Pull', 'Upper Body'] },
  { name: 'Rear Delt Flyes', type: ['Pull', 'Upper Body', 'Arms'] },
  { name: 'Face Pulls', type: ['Pull', 'Upper Body', 'Arms'] },
  { name: 'Bicep Curls', type: ['Arms', 'Upper Body'] },
  { name: 'Hammer Curls', type: ['Arms', 'Upper Body'] },
  { name: 'Bulgarian Split Squats', type: ['Legs Push', 'Legs Pull', 'Lower Body'] },
  { name: 'Trap Deadlifts', type: ['Legs Push', 'Legs Pull', 'Lower Body'] },
  { name: 'Deadlifts', type: ['Legs Push', 'Legs Pull', 'Lower Body'] },
  { name: 'Romanian Deadlifts', type: ['Legs Pull', 'Lower Body'] },
  { name: 'Lunges', type: ['Legs Push', 'Legs Pull', 'Lower Body'] },
  { name: 'Hack Squat', type: ['Legs Push', 'Lower Body'] },
  { name: 'Back Squat', type: ['Legs Push', 'Lower Body'] },
  { name: 'Front Squat', type: ['Legs Push', 'Lower Body'] },
  { name: 'Leg Extensions', type: ['Legs Push', 'Lower Body'] },
  { name: 'Hamstring Curls', type: ['Legs Pull', 'Lower Body'] },
  { name: 'Hip Thrust', type: ['Legs Push', 'Legs Pull', 'Lower Body'] },
  { name: 'Ghd', type: ['Legs Pull', 'Lower Body'] }
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
