export const LONG_CACHE = 3600000;

export const strengthLabels = ['Push', 'Pull', 'Upper Body', 'Legs Pull', 'Legs Push', 'Lower Body', 'Shouldres', 'calisthenics'];

export const cardioLabels = ['Running', 'Swimming', 'Cycling', 'Walking', 'Hiking'];

export const strengthExercises = [
  { name: 'Overhead Shoulder Press', type: ['Push', 'Shouldres'] },
  { name: 'Incline Bench', type: ['Push'] },
  { name: 'Dumbell Shoulder Press', type: ['Push', 'Shouldres'] },
  { name: 'Tricep Extensions', type: ['Push', 'Shouldres'] },
  { name: 'Lateral Raises', type: ['Push', 'Shouldres'] },
  { name: 'Pull Ups', type: ['Pull', 'Upper body'] },
  { name: 'Rows', type: ['Pull', 'Upper body'] },
  { name: 'Rear Delt Flyes', type: ['Pull', 'Upper body'] },
  { name: 'Bicep Curls', type: ['Pull', 'Upper body'] },
  { name: 'Bulgarian Split Squats', type: ['Legs Push', 'Legs Pull', 'Lower body'] },
  { name: 'Trap Deadlifts', type: ['Legs Push', 'Legs Pull', 'Lower body'] },
  { name: 'Deadlifts', type: ['Legs Push', 'Legs Pull', 'Lower body'] },
  { name: 'Hack Squat', type: ['Legs Push', 'Lower body'] },
  { name: 'Leg Extensions', type: ['Legs Push', 'Lower body'] },
  { name: 'Hamstring Curls', type: ['Legs Pull', 'Lower body'] },
  { name: 'Hip Thrust', type: ['Legs Push', 'Legs Pull', 'Lower body'] },
  { name: 'Ghd', type: ['Legs Pull', 'Lower body'] }
];

export const STRENGTH_COLOR = '#7AC0F7';
export const CARDIO_COLOR = '#a9d6a9';
