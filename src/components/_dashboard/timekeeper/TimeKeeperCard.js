import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const TimeKeeperCard = styled('img')({
  width: '50%',
  height: '270px',
  objectFit: 'cover'
});

// ----------------------------------------------------------------------

TimeKeeperCard.propTypes = {
  time: PropTypes.object
};

export default function TimeKeeperCards({ time }) {
  const { EmployeeName, Department, checkin, checkout } = time;
  const convertDateTime = (date) => {
    const dateTime = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return dateTime.toLocaleString('vi-VN', options);
  };
  console.log(time);
  return (
    <Stack spacing={2}>
      <Grid container justifyContent="center" sx={{ backgroundColor: '#ffcb5c', borderRadius: 1 }}>
        <Typography variant="h4" sx={{ color: '#9e6f00' }}>
          Employee ID: {checkin.EmployeeID}
        </Typography>
      </Grid>
      <Card>
        <Box sx={{ position: 'relative' }}>
          <Stack direction="row" spacing={1}>
            <TimeKeeperCard alt={EmployeeName} src={checkin.Image} />
            <TimeKeeperCard alt={EmployeeName} src={checkout.Image} />
          </Stack>
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
            <Grid
              container
              justifyContent="space-between"
              sx={{ backgroundColor: 'text.secondary', borderRadius: 1 }}
            >
              <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
                Check in:
              </Typography>
              <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
                {checkin.Status}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'white', p: 2, pt: 1 }}>
                {convertDateTime(checkin.CreatedAt)}
              </Typography>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              sx={{ backgroundColor: 'text.secondary', borderRadius: 1 }}
            >
              <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
                Check out:
              </Typography>
              <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
                {checkout.Status}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'white', p: 2, pt: 1 }}>
                {convertDateTime(checkout.CreatedAt)}
              </Typography>
            </Grid>
          </Stack>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="h5" noWrap>
              {EmployeeName}
            </Typography>
            <Typography variant="h6" noWrap>
              {Department}
            </Typography>
          </Link>
        </Stack>
      </Card>
    </Stack>
  );
}
