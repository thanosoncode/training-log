import { ClickAwayListener, Menu, Tooltip } from '@mui/material';
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
  const [anchorElement, setAnchorElement] = useState<(EventTarget & HTMLElement) | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsMenuOpen(!isMenuOpen);
    setAnchorElement(event.currentTarget);
  };
  const handleMenuClose = () => setIsMenuOpen(false);

  const handleClick = (workout: CombinedEntryWorkout) => {
    handleDayClick(workout);
    handleMenuClose();
  };

  return (
    <>
      <span
        onClick={handleMenuOpen}
        className={cx({
          [classes.day]: true,
          [classes.dayActive]: entry && entry.workouts && entry.workouts.length > 0
        })}>
        {index + 1}
      </span>
      <Menu open={isMenuOpen} anchorEl={anchorElement} onClose={handleMenuClose}>
        <div>
          <div className={classes.list}>
            {entry.workouts &&
              entry.workouts.map((workout, index) => (
                <div key={index} onClick={() => handleClick(workout)} className={classes.tooltipItem}>
                  {workout.label}
                </div>
              ))}
          </div>
        </div>
      </Menu>
    </>
  );
};
export default DayItem;
