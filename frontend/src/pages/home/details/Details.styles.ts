import { makeStyles } from 'tss-react/mui';
import theme from '../../../theme';
import { DetailsProps } from './Details.component';
import { CardioWorkoutFromServer, StrengthWorkoutServer } from '../../../utils/models';

export const useStyles = makeStyles<{
  cardio: CardioWorkoutFromServer[] | undefined;
  strength: StrengthWorkoutServer[] | undefined;
  isCardioLoading: boolean;
}>()((_, { cardio, isCardioLoading }) => {
  const cardioPercent = cardio && (cardio.length / 30) * 100;
  console.log('cardioPercent', cardioPercent);
  console.log('isCardioLoading', isCardioLoading);

  return {
    container: { display: 'flex', gap: '40px' },

    cardio: {
      color: theme.palette.common.cardio
    },
    strength: {
      color: theme.palette.primary.main
    },
    highlight: {
      fontSize: '20px',
      fontWeight: 'bold'
    }
  };
});
