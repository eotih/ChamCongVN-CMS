import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const TimeKeeperCard = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

TimeKeeperCard.propTypes = {
  time: PropTypes.object
};

export default function ShopProductCard({ time }) {
  const { EmployeeName, Department, checkin, checkout } = time;
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <TimeKeeperCard alt={EmployeeName} src={checkin.Image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {EmployeeName}
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {Department}
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}
