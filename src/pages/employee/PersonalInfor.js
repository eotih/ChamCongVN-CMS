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
export default function PersonalInfor({ values, handleChange }) {
  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {}
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
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Identity Card"
                      onChange={handleChange('IdentityCard')}
                      value={values.IdentityCard}
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      variant="outlined"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        fullWidth
                        views={['day', 'month', 'year']}
                        label="Date Range"
                        value={value1}
                        onChange={(date) => {
                          setValue1(date);
                          formik.setFieldValue('DateRange', date);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Issued By"
                      onChange={handleChange('IssuedBy')}
                      value={values.IssuedBy}
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      variant="outlined"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        fullWidth
                        views={['day', 'month', 'year']}
                        label="First date of work"
                        value={value}
                        onChange={(date) => {
                          setValue(date);
                          formik.setFieldValue('StartDate', date);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={1}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Health</InputLabel>
                      <Select
                        onChange={handleChange('Health')}
                        value={values.Health}
                        label="Health"
                      >
                        <MenuItem value="Tốt">Well</MenuItem>
                        <MenuItem value="Không Tốt">Not Well</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Social Insurance</InputLabel>
                      <Select
                        label="Social Insurance"
                        onChange={handleChange('SocialInsurance')}
                        value={values.SocialInsurance}
                      >
                        <MenuItem value="Có">Yes</MenuItem>
                        <MenuItem value="Không">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Health Insurance</InputLabel>
                      <Select
                        id="demo-simple-select"
                        label="Health Insurance"
                        onChange={handleChange('HealthInsurance')}
                        value={values.HealthInsurance}
                      >
                        <MenuItem value="Có">Yes</MenuItem>
                        <MenuItem value="Không">No</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Unemployment Insurance</InputLabel>
                      <Select
                        id="demo-simple-select"
                        label="Unemployment Insurance"
                        onChange={handleChange('UnemploymentInsurance')}
                        value={values.UnemploymentInsurance}
                      >
                        <MenuItem value="Có">Yes</MenuItem>
                        <MenuItem value="Không">No</MenuItem>
                      </Select>
                    </FormControl>
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
