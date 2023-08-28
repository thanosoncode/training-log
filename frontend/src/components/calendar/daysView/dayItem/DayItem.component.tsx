import { Tooltip, Typography } from '@mui/material';
import { useStyles } from './DayItem.styles';
import { CombinedEntry, CombinedEntryWorkout } from '../DaysView.component';

export interface DayItemProps {
  index: number;
  entry: CombinedEntry;
  handleDayClick: (workout: CombinedEntryWorkout) => void;
}

const DayItem: React.FC<DayItemProps> = ({ entry, handleDayClick, index }) => {
  const { classes, cx } = useStyles({ entry });

  return (
    <Tooltip
      classes={{ tooltip: classes.tooltipContainer }}
      title={
        <div>
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
        [classes.dayActive]: entry && entry.workouts && entry.workouts.length > 0
      })}>
      <span>{index + 1}</span>
    </Tooltip>
  );
};
export default DayItem;
