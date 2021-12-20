import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import EmployeeMoreMenu from './EmployeeMoreMenu';

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

export default function EmployeeCard({ Employee, handleOpenToast }) {
  const { DepartmentName, GroupName, ListDegree, ListSpeciality, PositionName, WorkName, emp } =
    Employee;
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          sx={{
            zIndex: 9,
            top: 16,
            left: 16,
            position: 'absolute',
            textTransform: 'uppercase'
          }}
        >
          <EmployeeMoreMenu dulieu={Employee} handleOpenToast={handleOpenToast} />
        </Label>
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
          {GroupName}
        </Label>
        <EmployeeImgStyle alt={emp.FullName} src={emp.Image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`./details/${emp.EmployeeID}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Grid container justifyContent="center">
            <Typography variant="h6" noWrap>
              [{DepartmentName} / {PositionName}]
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Typography variant="h5" noWrap>
              {emp.FullName}
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Typography variant="subtitle1" noWrap>
              {emp.NickName}
            </Typography>
          </Grid>
        </Link>
      </Stack>
    </Card>
  );
}
