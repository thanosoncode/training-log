import { Tooltip, Typography } from '@mui/material';
import { useStyles } from './DayItem.styles';
import { CombinedEntry, CombinedEntryWorkout } from '../DaysView.component';
import { cardioLabels, strengthLabels } from '../../../../utils/constants';

export interface DayItemProps {
  index: number;
  entry: CombinedEntry;
  handleDayClick: (workout: CombinedEntryWorkout) => void;
}

const DayItem: React.FC<DayItemProps> = ({ entry, handleDayClick, index }) => {
  const { classes, cx } = useStyles({ entry });
  const cardioAmount = entry.workouts && entry.workouts.filter((w) => cardioLabels.includes(w.label)).length;
  const strengthAmount = entry.workouts && entry.workouts.filter((w) => strengthLabels.includes(w.label)).length;

  return (
    <Tooltip
      classes={{ tooltip: classes.tooltipContainer }}
      title={
        <div>
          {/* <div>
            {cardioAmount > 0 && (
              <div className={classes.title}>
                {cardioAmount} cardio {cardioAmount === 1 ? 'workout' : 'workouts'}{' '}
              </div>
            )}
            {strengthAmount > 0 && (
              <div className={classes.title}>
                {strengthAmount} strength {strengthAmount === 1 ? 'workout' : 'workouts'}{' '}
              </div>
            )}
          </div> */}
          <div className={classes.list}>
            {entry.workouts &&
              entry.workouts.map((workout, index) => (
                <div key={index} onClick={() => handleDayClick(workout)} className={classes.tooltipItem}>
                  {workout.label}
                </div>
              ))}
          </div>
        </div>
      }
      className={cx({
        [classes.day]: true,
        [classes.dayActive]: entry.day.toString().length > 0
      })}>
      <span>{index + 1}</span>
    </Tooltip>
  );
};
export default DayItem;
