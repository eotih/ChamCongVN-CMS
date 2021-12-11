import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

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

export default function EmployeeCard({ Employee }) {
  const { DepartmentName, GroupName, ListDegree, ListSpeciality, PositionName, WorkName, emp } =
    Employee;
  console.log(Employee);
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color={(emp.FullName === 'sale' && 'error') || 'info'}
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            fontSize: 18,
            padding: 2,
            textTransform: 'uppercase'
          }}
        >
          {emp.FullName}
        </Label>
        <EmployeeImgStyle alt={emp.FullName} src={emp.Image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="./details" color="inherit" underline="hover" component={RouterLink}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" noWrap>
              Chức vụ:
            </Typography>
            <Typography variant="h6" noWrap>
              {DepartmentName}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" noWrap>
              Vị trí:
            </Typography>
            <Typography variant="h6" noWrap>
              {PositionName}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" noWrap>
              Phòng ban:
            </Typography>
            <Typography variant="h6" noWrap>
              {GroupName}
            </Typography>
          </Stack>
        </Link>
      </Stack>
    </Card>
  );
}
