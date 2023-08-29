import { Theme } from '@mui/material';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { makeStyles } from 'tss-react/mui';

const DetailsTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  const { classes } = useStyles({ label });

  if (active) {
    return (
      <div className={classes.root}>
        <p className={classes.label}>{`${payload?.[0].value} ${label}  `}</p>
      </div>
    );
  }

  return null;
};

export default DetailsTooltip;

const useStyles = makeStyles<{ label: any }>()((theme: Theme, { label }) => ({
  root: {
    margin: 0,
    padding: theme.spacing(0, 1),
    border: `1px solid ${label === 'Strength' ? theme.palette.primary.main : theme.palette.common.cardio}`,
    borderRadius: '4px'
  },
  label: {
    color: label === 'Strength' ? theme.palette.primary.main : theme.palette.common.cardio,
    fontWeight: 'bolder'
  }
}));
