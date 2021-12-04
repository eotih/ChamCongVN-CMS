import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import TimeKeeperCard from './TimeKeeperCard';

// ----------------------------------------------------------------------

TimeKeeperList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function TimeKeeperList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <TimeKeeperCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
