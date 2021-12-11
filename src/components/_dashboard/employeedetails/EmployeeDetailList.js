import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import EmployeeCard from './EmployeeDetailCard';

// ----------------------------------------------------------------------

EmployeeDetailList.propTypes = {
  Employees: PropTypes.array.isRequired
};

export default function EmployeeDetailList({ Employees, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {Employees.map((Employee) => (
        <Grid key={Employee.ImageID} item xs={12} sm={6} md={3}>
          <EmployeeCard Employee={Employee} />
        </Grid>
      ))}
    </Grid>
  );
}
