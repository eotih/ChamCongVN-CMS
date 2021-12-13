import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import EmployeeCard from './EmployeeCard';

// ----------------------------------------------------------------------

EmployeeList.propTypes = {
  Employees: PropTypes.array.isRequired
};

export default function EmployeeList({ Employees, ...other }) {
  console.log(Employees);
  return (
    <Grid container spacing={3} {...other}>
      {Employees.map((Employee, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <EmployeeCard Employee={Employee} />
        </Grid>
      ))}
    </Grid>
  );
}
