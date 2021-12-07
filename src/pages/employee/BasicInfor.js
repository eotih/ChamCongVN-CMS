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
//----------------------------------
function BasicInfor({ values, handleChange, onHandleNext }) {
  const [value, setValue] = useState(new Date());

  const Input = styled('input')({
    display: 'none'
  });

  return (
    <>
      <Form autoComplete="off" noValidate>
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
                  <Avatar src={values.Image} sx={{ width: 100, height: 100 }} />
                  <label htmlFor="contained-button-file">
                    <Input
                      id="contained-button-file"
                      type="file"
                      onChange={(e) => {
                        const { files } = e.target;
                        const reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = (e) => {
                          handleChange('Image', e.target.result);
                          console.log(values);
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
                    onChange={handleChange('FullName')}
                    value={values.FullName}
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Nick Name"
                    onChange={handleChange('NickName')}
                    value={values.NickName}
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    variant="outlined"
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label="Giới Tính"
                      onChange={handleChange('Gender')}
                      value={values.Gender}
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      variant="outlined"
                    />
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Phone"
                    onChange={handleChange('Phone')}
                    value={values.Phone}
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
                  onChange={handleChange('Email')}
                  value={values.Email}
                  variant="outlined"
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={['day', 'month', 'year']}
                      label="Date Of Birth"
                      value={value}
                      onChange={(date) => {
                        setValue(date);
                        handleChange('DateOfBirth', date);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <TextField
                    fullWidth
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    label="Place Of Birth"
                    onChange={handleChange('PlaceOfBirth')}
                    value={values.PlaceOfBirth}
                    variant="outlined"
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <TextField
                    fullWidth
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    label="Address"
                    onChange={handleChange('Address')}
                    value={values.Address}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                    label="Temporary Address"
                    onChange={handleChange('TemporaryAddress')}
                    value={values.TemporaryAddress}
                    variant="outlined"
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
export default memo(BasicInfor);
