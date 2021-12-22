/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  Container,
  Typography,
  Box,
  Modal,
  Avatar,
  Link,
  Button,
  Grid,
  Breadcrumbs,
  Card,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import md5 from 'md5';
import { LoadingButton } from '@mui/lab';
import axios from '../functions/Axios';
import Page from '../components/Page';
import { accountContext } from '../context/Hooks';
import Toast from '../components/Toast';

export default function EditAccount() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const account = accountContext();
  const { Employee, Account } = account;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const Input = styled('input')({
    display: 'none'
  });
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      EmployeeID: '',
      Image: '',
      Phone: '',
      TemporaryAddress: '',
      remember: true
    },
    onSubmit: () => {
      setLoading(true);
      axios
        .put(`Employee/Employee/${account.EmployeeID}`, formik.values)
        .then((res) => {
          if (res.data.Status === 200) {
            setOpen(false);
            handleOpenToast({
              isOpen: true,
              horizontal: 'right',
              vertical: 'top',
              message: 'Successfully updated',
              color: 'success'
            })();
            setLoading(false);
            window.location.reload();
          } else {
            handleOpenToast({
              isOpen: true,
              horizontal: 'right',
              vertical: 'top',
              message: 'Fail updated',
              color: 'error'
            })();
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const { handleSubmit, getFieldProps } = formik;
  const handleChangePassword = () => {
    const { Password } = formik.values;
    if (oldPassword === '' || newPassword === '' || repeatNewPassword === '') {
      alert('Please fill your password / New Password / Repeat New Password');
    } else if (newPassword !== repeatNewPassword) {
      alert('New Password and Repeat New Password do not match');
    } else if (Password !== md5(oldPassword)) {
      alert('Old Password Invalid');
    } else {
      setLoading(true);
      axios
        .put(`Organization/Account/Password/${Account.AccountID}`, {
          AccountID: formik.values.AccountID,
          Password: newPassword
        })
        .then((res) => {
          if (res.data.Status === 200) {
            setOpen(false);
            handleOpenToast({
              isOpen: true,
              horizontal: 'right',
              vertical: 'top',
              message: 'Successfully updated',
              color: 'success'
            })();
            setLoading(false);
          } else {
            handleOpenToast({
              isOpen: true,
              horizontal: 'right',
              vertical: 'top',
              message: 'Fail updated',
              color: 'error'
            })();
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (account && Employee) {
      formik.setFieldValue('AccountID', account.AccountID);
      formik.setFieldValue('Image', account.Image);
      formik.setFieldValue('Password', Account.Password);
      formik.setFieldValue('Phone', Employee.Phone);
      formik.setFieldValue('TemporaryAddress', Employee.TemporaryAddress);
    }
  }, [account, Employee]);
  return (
    <Page title="Profile">
      {openToast.isOpen === true && <Toast open={openToast} handleCloseToast={handleCloseToast} />}
      <Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack direction="column" spacing={3}>
              <Typography variant="h5">Change Password</Typography>
              <TextField
                fullWidth
                type="password"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                label="Old Password"
                variant="outlined"
              />
              <TextField
                fullWidth
                type="password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                label="New Password"
                variant="outlined"
              />
              <TextField
                fullWidth
                type="password"
                onChange={(e) => {
                  setRepeatNewPassword(e.target.value);
                }}
                label="Repeat new password"
                variant="outlined"
              />
              <Button onClick={handleChangePassword} fullWidth variant="contained" component="span">
                Change Password
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Typography color="text.primary">Edit Profile</Typography>
            </Breadcrumbs>
          </Typography>
        </Stack>
        {account && Employee && formik.values && (
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 5 }}>
                      <Stack
                        sx={{ mb: 3 }}
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems="center"
                        justifyContent="center"
                        spacing={2}
                      >
                        <Avatar src={formik.values.Image} sx={{ width: 100, height: 100 }} />
                        <label htmlFor="contained-button-file">
                          <Input
                            id="contained-button-file"
                            type="file"
                            onChange={(e) => {
                              const { files } = e.target;
                              const reader = new FileReader();
                              reader.readAsDataURL(files[0]);
                              reader.onload = (e) => {
                                formik.setFieldValue('Image', e.target.result);
                              };
                            }}
                          />
                          <Button fullWidth variant="contained" component="span">
                            Upload Image
                          </Button>
                        </label>
                      </Stack>
                      <Typography variant="subtitle1">
                        Tên nhân viên: {Employee.FullName}
                      </Typography>
                      <Typography variant="subtitle1">Email: {Account.Email}</Typography>
                      <Typography variant="subtitle1">Nickname: {Employee.NickName}</Typography>
                      <Button
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleOpen}
                        variant="contained"
                        component="span"
                      >
                        Change Password
                      </Button>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Card sx={{ p: 5 }}>
                      <Stack spacing={2}>
                        <Stack direction={{ xs: 'row' }} spacing={2}>
                          <TextField
                            fullWidth
                            label="Phone"
                            {...getFieldProps('Phone')}
                            variant="outlined"
                          />
                        </Stack>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                          <TextField
                            fullWidth
                            label="Address temporary"
                            {...getFieldProps('TemporaryAddress')}
                            variant="outlined"
                          />
                        </Stack>
                      </Stack>
                    </Card>
                    <LoadingButton
                      loading={loading}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Edit Profile
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </FormikProvider>
        )}
      </Container>
    </Page>
  );
}
