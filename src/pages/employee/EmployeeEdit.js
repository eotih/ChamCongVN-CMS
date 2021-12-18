/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Avatar,
  Input,
  TextField,
  Card,
  Link,
  Breadcrumbs,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import Page from '../../components/Page';
import BasicInfor from './BasicInfor';
import PersonalInfor from './PersonalInfor';
import Utilities from './Utilities';
import { getRecruitmentByID } from '../../functions/Employee';
import { getAllWorks, getAllGroups, getAllDepartments } from '../../functions/Component';
import { getAllSalaryTables } from '../../functions/Salary';
import { getAllPosition, getAllLevels } from '../../functions/Organization';
import axios from '../../functions/Axios';

export default function EmployeeEdit() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(new Date());
  const [level, setLevel] = useState([]);
  const [salarytable, setSalaryTable] = useState([]);
  const [group, setGroup] = useState([]);
  const [position, setPosition] = useState([]);
  const [department, setDepartment] = useState([]);
  const [work, setWork] = useState([]);

  const formik = useFormik({
    initialValues: {
      FullName: '',
      NickName: '',
      Gender: '',
      Image: '',
      DateOfBirth: '',
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
      SalaryTableID: '',
      DepartmentID: '',
      PositionID: '',
      WorkID: '',
      LevelID: '',
      GroupID: '',
      HealthInsurance: '',
      UnemploymentInsurance: '',
      CreatedBy: ''
    }
  });
  const {
    FullName,
    NickName,
    Gender,
    Image,
    LevelID,
    DateOfBirth,
    PlaceOfBirth,
    Address,
    TemporaryAddress,
    Email,
    Phone,
    IdentityCard,
    DateRange,
    IssuedBy,
    StartDate,
    Health,
    SalaryTableID,
    DepartmentID,
    PositionID,
    WorkID,
    GroupID,
    SocialInsurance,
    HealthInsurance,
    UnemploymentInsurance,
    CreatedBy
  } = formik.values;
  const values = {
    FullName,
    Gender,
    Image,
    DateOfBirth,
    NickName,
    PlaceOfBirth,
    Address,
    TemporaryAddress,
    Email,
    Phone,
    IdentityCard,
    DateRange,
    IssuedBy,
    StartDate,
    Health,
    SalaryTableID,
    DepartmentID,
    PositionID,
    WorkID,
    GroupID,
    SocialInsurance,
    HealthInsurance,
    UnemploymentInsurance,
    CreatedBy
  };
  useEffect(() => {
    getAllWorks().then((res) => {
      setWork(res);
    });
    getAllGroups().then((res) => {
      setGroup(res);
    });
    getAllDepartments().then((res) => {
      setDepartment(res);
    });
    getAllSalaryTables().then((res) => {
      setSalaryTable(res);
    });
    getAllPosition().then((res) => {
      setPosition(res);
    });
    getAllLevels().then((res) => {
      setLevel(res);
    });
  }, []);
  const Input = styled('input')({
    display: 'none'
  });
  const onChangeImg = (textName, img) => {
    formik.setFieldValue(`${textName}`, img);
  };
  const handleChange = (input) => (e) => {
    formik.setFieldValue(`${input}`, e.target.value);
  };

  return (
    <Page title="Edit Employee">
      <Container>
        <Box mt={2}>
          <Typography variant="h4" gutterBottom>
            Edit Recruit
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Link underline="hover" color="inherit" href="../">
                Employeelist
              </Link>
              <Typography color="text.primary">Edit</Typography>
            </Breadcrumbs>
          </Typography>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1}>
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
                        onChangeImg('Image', e.target.result);
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
                  defaultValue={values.NickName}
                  sx={{ bgcolor: '#ffffff', borderRadius: 1 }}
                  variant="outlined"
                />
              </Stack>
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
                      value={values.DateOfBirth}
                      onChange={(date) => {
                        setValue(date);
                        handleChange('DateOfBirth', value);
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Salary Table</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.SalaryTableID}
                    label="Salary Table"
                    onChange={handleChange('SalaryTableID')}
                  >
                    {salarytable.map((item) => (
                      <MenuItem key={item.SalaryTableID} value={item.SalaryTableID}>
                        {item.SalaryTableName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Group</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.GroupID}
                      label="Group"
                      onChange={handleChange('GroupID')}
                    >
                      {group.map((item) => (
                        <MenuItem key={item.GroupID} value={item.GroupID}>
                          {item.GroupName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Position</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.PositionID}
                      label="Position"
                      onChange={handleChange('PositionID')}
                    >
                      {position.map((item) => (
                        <MenuItem key={item.PositionID} value={item.PositionID}>
                          {item.PositionName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.DepartmentID}
                      label="Department"
                      onChange={handleChange('DepartmentID')}
                    >
                      {department.map((item) => (
                        <MenuItem key={item.DepartmentID} value={item.DepartmentID}>
                          {item.DepartmentName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Work</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.WorkID}
                      label="Work"
                      onChange={handleChange('WorkID')}
                    >
                      {work.map((item) => (
                        <MenuItem key={item.WorkID} value={item.WorkID}>
                          {item.WorkName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Level</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.LevelID}
                      label="Level"
                      onChange={handleChange('LevelID')}
                    >
                      {level.map((item) => (
                        <MenuItem key={item.Level.LevelID} value={item.Level.LevelID}>
                          {item.PositionName} - {item.Level.LevelName} - {item.Level.Coefficient}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Button loading={loading} fullWidth variant="contained" size="large">
                  Edit
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Box>
      </Container>
    </Page>
  );
}
