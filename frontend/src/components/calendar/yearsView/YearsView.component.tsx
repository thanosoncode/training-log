import Box from '@mui/material/Box';

import { useStyles } from './YearsView.styles';
import { useAppState } from '../../../context/AppContext';

interface YearsViewProps {
  handleYearClick: (year: number) => void;
}

const YearsView: React.FC<YearsViewProps> = ({ handleYearClick }) => {
  const { classes, cx } = useStyles();
  const { year } = useAppState();

  const getAllYears = (start: number, end: number) => {
    const array: number[] = [];
    for (let i = start; i <= end; i++) {
      array.push(i);
    }
    return array;
  };

  return (
    <Box className={classes.years}>
      {getAllYears(2000, 2050).map((y) => {
        const isCurrentYear = y === year;
        return (
          <span
            key={y}
            onClick={() => handleYearClick(y)}
            className={cx({
              [classes.year]: !isCurrentYear,
              [classes.isCurrentYear]: isCurrentYear
            })}>
            {y}
          </span>
        );
      })}
    </Box>
  );
};
export default YearsView;
