import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// material
import {
  Container,
  Stack,
  Typography,
  Link,
  Breadcrumbs,
  Grid,
  Card,
  Avatar,
  Divider,
  Paper
} from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { getEmployeeByID } from '../../functions/Employee';
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
              Employeelist
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
                    <Grid item xs={12} md={6}>
                      <Stack direction={{ xs: 'column' }} spacing={1}>
                        <Grid container direction="row" justifyContent="center">
                          <Typography justifyContent="center" variant="h3" noWrap>
                            {Employee.FullName}
                          </Typography>
                        </Grid>
                        <Divider />
                        <Grid sx={{ pr: 3 }} container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                              <Box sx={{ mb: 0.5 }}>
                                <Icon icon="ic:outline-badge" width="50" height="50" />
                              </Box>
                              <Typography variant="h6">Phòng:</Typography>
                              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                {DepartmentName}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                              <Box sx={{ mb: 0.5 }}>
                                <Icon
                                  icon="ic:baseline-supervised-user-circle"
                                  width="50"
                                  height="50"
                                />
                              </Box>
                              <Typography variant="h6">Tổ:</Typography>
                              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                {GroupName}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                              <Box sx={{ mb: 0.5 }}>
                                <Icon
                                  icon="ic:round-precision-manufacturing"
                                  width="50"
                                  height="50"
                                />
                              </Box>
                              <Typography variant="h6">Chức vụ:</Typography>
                              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                {PositionName}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                              <Box sx={{ mb: 0.5 }}>
                                <Icon icon="ic:baseline-work" width="50" height="50" />
                              </Box>
                              <Typography variant="h6">Công việc:</Typography>
                              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                {WorkName}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6} md={12}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                              <Stack
                                alignItems="center"
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                              >
                                <Icon icon="ic:outline-school" width="50" height="50" />
                                {ListDegree && ListDegree.length > 0 && (
                                  <>
                                    <Typography variant="h6">Bằng cấp:</Typography>
                                    {ListDegree.map((item, index) => (
                                      <Typography key={index}>{item.DegreeName},</Typography>
                                    ))}
                                  </>
                                )}
                              </Stack>
                            </Paper>
                          </Grid>
                          <Grid item xs={6} md={12}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                              <Stack
                                alignItems="center"
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                              >
                                <Icon icon="ic:outline-hail" width="50" height="50" />
                                {ListSpeciality && ListSpeciality.length > 0 && (
                                  <>
                                    <Typography variant="h6">Chuyên môn:</Typography>
                                    {ListSpeciality.map((item, index) => (
                                      <Typography key={index}>{item.SpecialtyName},</Typography>
                                    ))}
                                  </>
                                )}
                              </Stack>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Grid>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
}
