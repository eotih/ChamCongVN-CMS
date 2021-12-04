import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import TimeKeeperCard from './TimeKeeperCard';

// ----------------------------------------------------------------------

TimeKeeperList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function TimeKeeperList({ time, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {time.map((time) => (
        <Grid key={time.$id} item xs={12} sm={6} md={3}>
          <TimeKeeperCard time={time} />
        </Grid>
      ))}
    </Grid>
  );
}
