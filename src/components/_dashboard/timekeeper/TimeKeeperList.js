import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import TimeKeeperCard from './TimeKeeperCard';

// ----------------------------------------------------------------------

TimeKeeperList.propTypes = {
  time: PropTypes.array.isRequired
};

export default function TimeKeeperList({ time, ...other }) {
  return (
    <Grid container spacing={1} {...other}>
      {time.map((time, index) => (
        <Grid key={index} item xs={12} sm={6}>
          <TimeKeeperCard time={time} />
        </Grid>
      ))}
    </Grid>
  );
}
