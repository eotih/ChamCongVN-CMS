/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Stack,
  TextField,
  Typography,
  Grid,
  Card,
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Checkbox
} from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import React, { useState, useEffect, memo, useContext } from 'react';
import { styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from '../../functions/Axios';
//----------------------------------
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};
export default function PersonalInfor({ onHandleNext }) {
  const [images, setImages] = useState([]);
  const [SalaryTable, setSalaryTable] = React.useState('');
  const [Group, setGroup] = React.useState('');
  const [Position, setPosition] = React.useState('');
  const [Department, setDepartment] = React.useState('');
  const [Work, setWork] = React.useState('');
  const [personName, setPersonName] = React.useState([]);
  const [personNames, setPersonNames] = React.useState([]);
  const [value, setValue] = React.useState(new Date());
  const handleEditorChange = (content) => {
    formik.setFieldValue('Details', content);
  };
  const handleChange = (event) => {
    setGroup(event.target.value);
  };
  const handleChangeST = (event) => {
    setSalaryTable(event.target.value);
  };
  const handleChangeSI = (event) => {
    setPosition(event.target.value);
  };
  const handleChangeHI = (event) => {
    setDepartment(event.target.value);
  };
  const handleChangeUI = (event) => {
    setWork(event.target.value);
  };
  const handleChangeDegree = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };
  const handleChangeSpecialities = (event) => {
    const {
      target: { value }
    } = event;
    setPersonNames(typeof value === 'string' ? value.split(',') : value);
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
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Salary Table</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={SalaryTable}
                      label="Salary Table"
                      onChange={handleChangeST}
                    >
                      <MenuItem value={1}>Well</MenuItem>
                      <MenuItem value={2}>Not Well</MenuItem>
                    </Select>
                  </FormControl>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Group</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Group}
                        label="Group"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Well</MenuItem>
                        <MenuItem value={2}>Not Well</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Position</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Position}
                        label="Position"
                        onChange={handleChangeSI}
                      >
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={2}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Department</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Department}
                        label="Department"
                        onChange={handleChangeHI}
                      >
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={2}>No</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Work</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Work}
                        label="Work"
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
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={1}>
                  <Stack direction={{ xs: 'column' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-checkbox-label">Degree</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChangeDegree}
                        input={<OutlinedInput label="Degree" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-checkbox-label">Speciality</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personNames}
                        onChange={handleChangeSpecialities}
                        input={<OutlinedInput label="Speciality" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personNames.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Work}
                        label="Work"
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
