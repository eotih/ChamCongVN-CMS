import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';

// ----------------------------------------------------------------------

const EmployeeImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

EmployeeCard.propTypes = {
  Employee: PropTypes.object
};
const convertQuantity = (quantity) => {
  if (quantity === 0) {
    return (
      <Label
        variant="filled"
        color="error"
        sx={{
          zIndex: 9,
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase'
        }}
      >
        Out of stock
      </Label>
    );
  }
  if (quantity < 5) {
    return (
      <Label
        variant="filled"
        color="warning"
        sx={{
          zIndex: 9,
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase'
        }}
      >
        Low stock
      </Label>
    );
  }
  return (
    <Label
      variant="filled"
      color="success"
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase'
      }}
    >
      In stock
    </Label>
  );
};
export default function EmployeeCard({ Employee }) {
  const { EmployeeName, Image1, ImageID } = Employee;
  console.log(Employee);
  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <EmployeeImgStyle alt={EmployeeName} src={emp.Image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            Hình {EmployeeName} {ImageID}
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}
