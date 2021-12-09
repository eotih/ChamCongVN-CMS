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
export default function PersonalInfor({ values, handleChange, onChangeDate }) {
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
            <Grid item xs={12} md={7}>
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
                        value={values.DateRange}
                        onChange={(date) => {
                          onChangeDate('DateRange', date);
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
                        value={values.StartDate}
                        onChange={(date) => {
                          onChangeDate('StartDate', date);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={1}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label1">Health</InputLabel>
                      <Select
                        onChange={handleChange('Health')}
                        defaultValue={values.Health}
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
                        defaultValue={values.SocialInsurance}
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
                        defaultValue={values.HealthInsurance}
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
                        defaultValue={values.UnemploymentInsurance}
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
