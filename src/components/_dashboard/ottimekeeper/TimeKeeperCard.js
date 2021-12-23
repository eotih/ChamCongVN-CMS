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
  const {
    EmployeeName,
    Department,
    OTCheckInImage,
    OTCheckOutImage,
    OTCheckInCreatedAt,
    OTCheckOutCreatedAt,
    OTCheckInStatus,
    EmployeeID,
    OTCheckOutStatus
  } = time;
  const convertCIStatus = (status) => {
    if (status === 'Đúng giờ') {
      return (
        <>
          <Grid
            container
            justifyContent="space-between"
            sx={{ backgroundColor: '#00ab55', borderRadius: 1 }}
          >
            <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
              Check in:
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
              Đúng giờ
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'white', p: 2, pt: 1 }}>
              {convertDate(OTCheckInCreatedAt)}
            </Typography>
          </Grid>
        </>
      );
    }
    if (status === 'Đi muộn') {
      return (
        <>
          <Grid
            container
            justifyContent="space-between"
            sx={{ backgroundColor: '#FF4845', borderRadius: 1 }}
          >
            <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
              Check in:
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
              Đi muộn
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'white', p: 2, pt: 1 }}>
              {convertDate(OTCheckInCreatedAt)}
            </Typography>
          </Grid>
        </>
      );
    }
  };
  const convertCOStatus = (status) => {
    if (status === 'Đúng giờ') {
      return (
        <>
          <Grid
            container
            justifyContent="space-between"
            sx={{ backgroundColor: '#00ab55', borderRadius: 1 }}
          >
            <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
              Check out:
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
              Đúng giờ
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'white', p: 2, pt: 1 }}>
              {convertDate(OTCheckOutCreatedAt)}
            </Typography>
          </Grid>
        </>
      );
    }
    if (status === 'Về sớm') {
      return (
        <>
          <Grid
            container
            justifyContent="space-between"
            sx={{ backgroundColor: '#ffb300', borderRadius: 1 }}
          >
            <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
              Check out:
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', p: 2, pb: 0 }}>
              Về sớm
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'white', p: 2, pt: 1 }}>
              {convertDate(OTCheckOutCreatedAt)}
            </Typography>
          </Grid>
        </>
      );
    }
  };
  const convertDate = (date) => {
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
  return (
    <Stack spacing={2}>
      <Grid container justifyContent="center" sx={{ backgroundColor: '#ffcb5c', borderRadius: 1 }}>
        <Typography variant="h4" sx={{ color: '#9e6f00' }}>
          Employee ID: {EmployeeID}
        </Typography>
      </Grid>
      <Card>
        <Box sx={{ position: 'relative' }}>
          <Stack direction="row" spacing={1}>
            <TimeKeeperCard alt={EmployeeName} src={`data:image/jpeg;base64,${OTCheckInImage}`} />
            <TimeKeeperCard alt={EmployeeName} src={`data:image/jpeg;base64,${OTCheckOutImage}`} />
          </Stack>
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
            {convertCIStatus(OTCheckInStatus)}
            {convertCOStatus(OTCheckOutStatus)}
          </Stack>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="h4" noWrap>
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
