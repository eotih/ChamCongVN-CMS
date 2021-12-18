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
  Grid,
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
import { LoadingButton } from '@mui/lab';
import Page from '../../components/Page';
import BasicInfor from './BasicInfor';
import PersonalInfor from './PersonalInfor';
import Utilities from './Utilities';
import { getEmployeeByID } from '../../functions/Employee';
import { getAllWorks, getAllGroups, getAllDepartments } from '../../functions/Component';
import { getAllSalaryTables } from '../../functions/Salary';
import { getAllPosition, getAllLevels } from '../../functions/Organization';
import axios from '../../functions/Axios';
import Toast from '../../components/Toast';

export default function EmployeeEdit() {
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState([]);
  const [levels, setLevels] = useState([]);
  const [salarytable, setSalaryTable] = useState([]);
  const [salarytables, setSalaryTables] = useState([]);
  const [group, setGroup] = useState([]);
  const [groups, setGroups] = useState([]);
  const [position, setPosition] = useState([]);
  const [positions, setPositions] = useState([]);
  const [department, setDepartment] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [work, setWork] = useState([]);
  const [works, setWorks] = useState([]);
  const [open, setOpen] = useState(false);
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
  const formik = useFormik({
    initialValues: {
      EmployeeID: '',
      SalaryTableID: '',
      DepartmentID: '',
      PositionID: '',
      WorkID: '',
      LevelID: '',
      GroupID: '',
      UpdatedBy: ''
    },
    onSubmit: () => {
      setLoading(true);
      axios
        .put(`Employee/Employee/${id}/Manager`, formik.values)
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
  const { id } = useParams();
  useEffect(() => {
    getEmployeeByID(id).then((res) => {
      const { Employee } = res;
      formik.setFieldValue('FullName', Employee.FullName);
      formik.setFieldValue('Image', Employee.Image);
      formik.setFieldValue('WorkID', Employee.WorkID);
      formik.setFieldValue('GroupID', Employee.GroupID);
      formik.setFieldValue('PositionID', Employee.PositionID);
      formik.setFieldValue('LevelID', Employee.LevelID);
      formik.setFieldValue('DepartmentID', Employee.DepartmentID);
      formik.setFieldValue('SalaryTableID', Employee.SalaryTableID);
    });
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
  const handleChangeWork = (event) => {
    formik.setFieldValue('WorkID', event.target.value);
    setWorks(event.target.value);
  };
  const handleChangeGroup = (event) => {
    formik.setFieldValue('GroupID', event.target.value);
    setGroups(event.target.value);
  };
  const handleChangePosition = (event) => {
    formik.setFieldValue('PositionID', event.target.value);
    setPositions(event.target.value);
  };
  const handleChangeDepartment = (event) => {
    formik.setFieldValue('DepartmentID', event.target.value);
    setDepartments(event.target.value);
  };
  const handleChangeSalaryTable = (event) => {
    formik.setFieldValue('SalaryTableID', event.target.value);
    setSalaryTables(event.target.value);
  };
  const handleChangeLevel = (event) => {
    formik.setFieldValue('LevelID', event.target.value);
    setLevels(event.target.value);
  };
  const Input = styled('input')({
    display: 'none'
  });
  const { handleSubmit, getFieldProps } = formik;
  return (
    <Page title="Edit Employee | ChamCongVN">
      {openToast.isOpen === true && <Toast open={openToast} handleCloseToast={handleCloseToast} />}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employees
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
              <Typography color="text.primary">Edit Employee</Typography>
            </Breadcrumbs>
          </Typography>
        </Stack>
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
                    </Stack>
                    <Typography variant="h6" component="h2">
                      Full Name : {formik.values.FullName}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Card sx={{ p: 5 }}>
                    <Stack spacing={2}>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Position</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={positions}
                            {...getFieldProps('PositionID')}
                            label="Position"
                            onChange={handleChangePosition}
                          >
                            {position.map((item) => (
                              <MenuItem key={item.PositionID} value={item.PositionID}>
                                {item.PositionName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Salary Table</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={salarytables}
                            {...getFieldProps('SalaryTableID')}
                            label="Salary Table"
                            onChange={handleChangeSalaryTable}
                          >
                            {salarytable.map((item) => (
                              <MenuItem key={item.SalaryTableID} value={item.SalaryTableID}>
                                {item.SalaryTableName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Level</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={levels}
                            {...getFieldProps('LevelID')}
                            label="Level"
                            onChange={handleChangeLevel}
                          >
                            {level.map((item) => (
                              <MenuItem key={item.Level.LevelID} value={item.Level.LevelID}>
                                {item.PositionName} - {item.Level.LevelName} -{' '}
                                {item.Level.Coefficient}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Group</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={groups}
                            {...getFieldProps('GroupID')}
                            label="Group"
                            onChange={handleChangeGroup}
                          >
                            {group.map((item) => (
                              <MenuItem key={item.GroupID} value={item.GroupID}>
                                {item.GroupName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Work</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={works}
                            {...getFieldProps('WorkID')}
                            label="Work"
                            onChange={handleChangeWork}
                          >
                            {work.map((item) => (
                              <MenuItem key={item.WorkID} value={item.WorkID}>
                                {item.WorkName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack direction={{ xs: 'row' }} spacing={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Department</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={departments}
                            {...getFieldProps('DepartmentID')}
                            label="Department"
                            onChange={handleChangeDepartment}
                          >
                            {department.map((item) => (
                              <MenuItem key={item.DepartmentID} value={item.DepartmentID}>
                                {item.DepartmentName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                    Edit Employee
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
