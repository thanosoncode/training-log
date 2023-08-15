import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { CombinedEntry } from '../DaysView.component';
import { cardioLabels, strengthLabels } from '../../../../utils/constants';

export const useStyles = makeStyles<{ entry: CombinedEntry }>()((theme: Theme, { entry }) => {
  const getDayColor = (entry: CombinedEntry) => {
    if (entry.workouts) {
      const isOnlyCardio = entry.workouts.every((w) => cardioLabels.includes(w.label));
      const isOnlyStrength = entry.workouts.every((w) => strengthLabels.includes(w.label));

      const baseLightness = 75;
      const increase = entry.workouts.length * 5;

      const blue = `hsl(207, 67%, ${baseLightness - increase}%)`;
      const green = `hsl(120, 35%, ${baseLightness - increase}%)`;
      const mixed = `hsl(163.5, 51%, ${baseLightness - increase}%)`;

      if (isOnlyCardio) {
        return green;
      }
      if (isOnlyStrength) {
        return blue;
      }
      return mixed;
    }
  };

  return {
    day: {
      cursor: 'pointer',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: theme.spacing(1),
      '&: hover': {
        backgroundColor: theme.palette.grey[300]
      }
    },
    dayActive: {
      backgroundColor: getDayColor(entry),
      color: 'white'
    },
    tooltipContainer: { padding: theme.spacing(1, 0) },
    title: { fontWeight: 600, fontSize: '15px' },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontWeight: 'bold',
      fontSize: 14,
      textTransform: 'capitalize'
    },
    tooltipItem: {
      padding: theme.spacing(1, 2),
      cursor: 'pointer',
      '&:hover': { backgroundColor: getDayColor(entry) }
    }
  };
});
