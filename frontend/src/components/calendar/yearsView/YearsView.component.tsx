import Box from '@mui/material/Box';

import { useStyles } from './YearsView.styles';

interface YearsViewProps {
  year: number;
  handleYearClick: (year: number) => void;
}

const YearsView: React.FC<YearsViewProps> = ({ year, handleYearClick }) => {
  const { classes, cx } = useStyles();

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
        const isCurrentYear = y + 1 === year;
        return (
          <span
            key={y}
            onClick={() => handleYearClick(y + 1)}
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
