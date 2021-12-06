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
export default function PersonalInfor({ onHandleNext }) {
  const [images, setImages] = useState([]);
  const [Health, setHealth] = useState([]);
  const [SocialInsurance, setSocialInsurance] = useState([]);
  const [HealthInsurance, setHealthInsurance] = useState([]);
  const [UnemploymentInsurance, setUnemploymentInsurance] = useState([]);
  const [value, setValue] = useState(new Date());
  const handleChange = (event) => {
    setHealth(event.target.value);
  };
  const handleChangeSI = (event) => {
    setSocialInsurance(event.target.value);
  };
  const handleChangeHI = (event) => {
    setHealthInsurance(event.target.value);
  };
  const handleChangeUI = (event) => {
    setUnemploymentInsurance(event.target.value);
  };

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
                      {...getFieldProps('IdentityCard')}
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      variant="outlined"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        fullWidth
                        views={['day', 'month', 'year']}
                        label="Date Range"
                        value={value}
                        {...getFieldProps('DateRange')}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Issued By"
                      {...getFieldProps('IssuedBy')}
                      sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                      variant="outlined"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        fullWidth
                        views={['day', 'month', 'year']}
                        label="First date of work"
                        value={value}
                        {...getFieldProps('StartDate')}
                        onChange={(newValue) => {
                          setValue(newValue);
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
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Health}
                        label="Health"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Well</MenuItem>
                        <MenuItem value={2}>Not Well</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Social Insurance</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SocialInsurance}
                        label="Social Insurance"
                        onChange={handleChangeSI}
                      >
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={2}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Health Insurance</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={HealthInsurance}
                        label="Health Insurance"
                        onChange={handleChangeHI}
                      >
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={2}>No</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Unemployment Insurance</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={UnemploymentInsurance}
                        label="Unemployment Insurance"
                        onChange={handleChangeUI}
                      >
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={2}>No</MenuItem>
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
