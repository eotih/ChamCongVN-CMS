/* eslint-disable import/no-unresolved */
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// components
import Page from '../../components/Page';
import {
  EmployeeSort,
  EmployeeList,
  EmployeeWidget,
  EmployeeFilterSidebar
} from '../../components/_dashboard/employee';
//
import { getAllEmployees } from '../../functions/Employee';
import Toast from '../../components/Toast';

// ----------------------------------------------------------------------

export default function Employee() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [Employee, setEmployee] = useState([]);
  const [openToast, setOpenToast] = useState({
    isOpen: false,
    vertical: 'top',
    message: '',
    color: '',
    horizontal: 'right'
  });

  const handleOpenToast = (newState) => () => {
    setOpenToast({ isOpen: true, ...newState });
  };
  const handleCloseToast = () => {
    setOpenToast({ ...openToast, isOpen: false });
  };
  useEffect(() => {
    getAllEmployees().then((res) => {
      setEmployee(res);
      setIsLoaded(true);
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
    <Page title="Dashboard: Employee | ChamCongVN">
      {openToast.isOpen === true && <Toast open={openToast} handleCloseToast={handleCloseToast} />}
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Employee
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <EmployeeFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <EmployeeSort />
          </Stack>
        </Stack>

        <EmployeeList Employees={Employee} handleOpenToast={handleOpenToast} />
        <EmployeeWidget />
      </Container>
    </Page>
  );
}
