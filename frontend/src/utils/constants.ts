import { CardioLabel, StrengthExercise, StrengthLabel } from './models';

export const LONG_CACHE = 3600000;
export const STRENGTH_COLOR = '#7AC0F7';
export const CARDIO_COLOR = '#a9d6a9';

export const strengthLabels: StrengthLabel[] = ['Push', 'Pull', 'Upper Body', 'Legs Pull', 'Legs Push', 'Lower Body', 'Shouldres', 'Calisthenics'];

export const cardioLabels: CardioLabel[] = ['Running', 'Swimming', 'Cycling', 'Walking', 'Hiking'];

export const strengthExercises: StrengthExercise[] = [
  { name: 'Overhead Shoulder Press', type: ['Push', 'Shouldres'] },
  { name: 'Incline Bench', type: ['Push'] },
  { name: 'Dumbell Shoulder Press', type: ['Push', 'Shouldres'] },
  { name: 'Tricep Extensions', type: ['Push', 'Shouldres'] },
  { name: 'Lateral Raises', type: ['Push', 'Shouldres'] },
  { name: 'Pull Ups', type: ['Pull', 'Upper Body'] },
  { name: 'Rows', type: ['Pull', 'Upper Body'] },
  { name: 'Rear Delt Flyes', type: ['Pull', 'Upper Body'] },
  { name: 'Bicep Curls', type: ['Pull', 'Upper Body'] },
  { name: 'Bulgarian Split Squats', type: ['Legs Push', 'Legs Pull', 'Lower Body'] },
  { name: 'Trap Deadlifts', type: ['Legs Push', 'Legs Pull', 'Lower Body'] },
  { name: 'Deadlifts', type: ['Legs Push', 'Legs Pull', 'Lower Body'] },
  { name: 'Hack Squat', type: ['Legs Push', 'Lower Body'] },
  { name: 'Leg Extensions', type: ['Legs Push', 'Lower Body'] },
  { name: 'Hamstring Curls', type: ['Legs Pull', 'Lower Body'] },
  { name: 'Hip Thrust', type: ['Legs Push', 'Legs Pull', 'Lower Body'] },
  { name: 'Ghd', type: ['Legs Pull', 'Lower Body'] }
];
