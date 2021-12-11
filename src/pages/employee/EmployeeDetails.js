import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// material
import { Container, Stack, Typography, Link, Breadcrumbs } from '@mui/material';
// components
import Page from '../../components/Page';
import { getEmployeeByID } from '../../functions/Employee';
import {
  EmployeeDetailSort,
  EmployeeDetailList,
  EmployeeDetailCartWidget,
  EmployeeDetailFilterSidebar
} from '../../components/_dashboard/employeedetails';

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
  console.log(Employee);
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

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <EmployeeDetailFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <EmployeeDetailSort />
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap>
            Tên:
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap>
            Phòng: {DepartmentName}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap>
            Tổ: {GroupName}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap>
            Chức vụ: {PositionName}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap>
            Công việc: {WorkName}
          </Typography>
        </Stack>
        {/* <EmployeeDetailList Employees={employee} /> */}
        <EmployeeDetailCartWidget />
      </Container>
    </Page>
  );
}
