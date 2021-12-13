import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// material
import { Container, Stack, Typography, Link, Breadcrumbs, Grid, Card, Avatar } from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { getEmployeeByID } from '../../functions/Employee';
import { EmployeeDetailCartWidget } from '../../components/_dashboard/employeedetails';

// ----------------------------------------------------------------------

export default function EmployeeDetails() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    getEmployeeByID(id).then((res) => {
      setIsLoaded(true);
      setEmployee(res);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });
  const {
    DepartmentName,
    GroupName,
    ListDegree,
    ListSpeciality,
    PositionName,
    WorkName,
    Employee
  } = employee;
  console.log(ListDegree);
  console.log(ListSpeciality);
  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Employees Detail">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Employees Detail
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
            <Link underline="hover" color="inherit" href="../">
              Employees
            </Link>
            <Typography color="text.primary">Detail / {id}</Typography>
          </Breadcrumbs>
        </Typography>
        {Employee && (
          <>
            <Grid container>
              <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={8}>
                    <Grid item xs={12} md={6}>
                      <Avatar
                        src={Employee.Image}
                        variant="rounded"
                        sx={{ width: '100%', height: 'auto' }}
                      />
                    </Grid>
                    <Stack direction={{ xs: 'column' }} spacing={2}>
                      <Typography variant="h4" noWrap>
                        Tên: {Employee.FullName}
                      </Typography>
                      <Stack direction={{ xs: 'column' }} spacing={2}>
                        <Typography variant="subtitle1">Phòng: {DepartmentName}</Typography>
                        <Typography variant="subtitle1">Tổ: {GroupName}</Typography>
                        <Typography variant="subtitle1">Chức vụ: {PositionName}</Typography>
                        <Typography variant="subtitle1">Công việc: {WorkName}</Typography>
                      </Stack>
                      {ListDegree && ListDegree.length > 0 && (
                        <>
                          <Typography variant="subtitle1">Bằng cấp:</Typography>
                          <ul>
                            {ListDegree.map((item, index) => (
                              <li key={index}>{item.DegreeName}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {ListSpeciality && ListSpeciality.length > 0 && (
                        <>
                          <Typography variant="subtitle1">Chuyên môn:</Typography>
                          <ul>
                            {ListSpeciality.map((item, index) => (
                              <li key={index}>{item.SpecialtyName}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
        <EmployeeDetailCartWidget />
      </Container>
    </Page>
  );
}
