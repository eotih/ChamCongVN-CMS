/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Stack,
  TextField,
  Typography,
  Grid,
  Card,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import React, { useState, useEffect, memo, useContext } from 'react';
import { styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from '../../functions/Axios';
//----------------------------------
function BasicInfor({ data, onHandleNext }) {
  const [images, setImages] = useState([]);
  const [data1, setData1] = useState([]);
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    formik.setFieldValue('FullName', data.FullName);
    formik.setFieldValue('Email', data.Email);
    formik.setFieldValue('Gender', data.Gender);
    formik.setFieldValue('Phone', data.Phone);
    formik.setFieldValue('TemporaryAddress', data.TemporaryAddress);
    formik.setFieldValue('Address', data.Address);
    formik.setFieldValue('DateOfBirth', data.DateOfBirth);
  }, [data]);
  const Input = styled('input')({
    display: 'none'
  });

  const formik = useFormik({
    initialValues: {
      FullName: '',
      NickName: '',
      Gender: '',
      Image: '',
      PlaceOfBirth: '',
      Address: '',
      TemporaryAddress: '',
      Email: '',
      Phone: '',
      IdentityCard: '',
      DateRange: '',
      IssuedBy: '',
      StartDate: '',
      Health: '',
      SocialInsurance: '',
      HealthInsurance: '',
      UnemploymentInsurance: '',
      CreatedBy: ''
    },
    onSubmit: () => {
      axios.post(`Employee/AddOrEditEmployee`, formik.values).then((res) => {
        if (res.data.Status === 'Success') {
          setData1(formik.values);
          onHandleNext(formik.values);
        } else {
          alert('Add Failed');
        }
      });
    }
  });
  const { handleSubmit, getFieldProps } = formik;
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={2}>
                  <Stack
                    sx={{ mb: 3 }}
                    direction={{ xs: 'column', md: 'row' }}
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
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...getFieldProps('FullName')}
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Nick Name"
                      {...getFieldProps('NickName')}
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        label="Giới Tính"
                        {...getFieldProps('Gender')}
                        sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                        variant="outlined"
                      />
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Phone"
                      {...getFieldProps('Phone')}
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      variant="outlined"
                    />
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={1}>
                  <TextField
                    fullWidth
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    label="Email"
                    {...getFieldProps('Email')}
                    variant="outlined"
                  />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={['day', 'month', 'year']}
                        label="Date Of Birth"
                        value={value}
                        {...getFieldProps('DateOfBirth')}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <TextField
                      fullWidth
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      label="Place Of Birth"
                      {...getFieldProps('PlaceOfBirth')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <TextField
                      fullWidth
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      label="Address"
                      {...getFieldProps('Address')}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      label="Temporary Address"
                      {...getFieldProps('TemporaryAddress')}
                      variant="outlined"
                    />
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
export default memo(BasicInfor);
