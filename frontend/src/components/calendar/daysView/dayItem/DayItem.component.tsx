import { ClickAwayListener, Tooltip } from '@mui/material';
import { useStyles } from './DayItem.styles';
import { CombinedEntry, CombinedEntryWorkout } from '../DaysView.component';
import { useState } from 'react';

export interface DayItemProps {
  index: number;
  entry: CombinedEntry;
  handleDayClick: (workout: CombinedEntryWorkout) => void;
}

const DayItem: React.FC<DayItemProps> = ({ entry, handleDayClick, index }) => {
  const { classes, cx } = useStyles({ entry });
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipOpen = () => setTooltipOpen(true);
  const handleTooltipClose = () => setTooltipOpen(false);

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        open={tooltipOpen}
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
        <span onClick={handleTooltipOpen}>{index + 1}</span>
      </Tooltip>
    </ClickAwayListener>
  );
};
export default DayItem;
