/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Stack, Grid, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import React, { useState, useEffect } from 'react';
import { getAllWorks, getAllGroups, getAllDepartments } from '../../functions/Component';
import { getAllSalaryTables } from '../../functions/Salary';
import { getAllPosition, getAllLevels } from '../../functions/Organization';
//----------------------------------

export default function Utilities({ values, handleChange, handleSubmit }) {
  const [level, setLevel] = useState([]);
  const [salaryTable, setSalaryTable] = useState([]);
  const [group, setGroup] = useState([]);
  const [position, setPosition] = useState([]);
  const [department, setDepartment] = useState([]);
  const [work, setWork] = useState([]);
  const handleEditorChange = (content) => {
    formik.setFieldValue('Details', content);
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
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      console.log(values);
    }
  });
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column' }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Salary Table</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.SalaryTableID}
                      label="Salary Table"
                      onChange={handleChange('SalaryTableID')}
                    >
                      {salaryTable.map((item) => (
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
                </Stack>
              </Card>
            </Grid>
            {/* <LoadingButton fullWidth size="large" onClick={handleSubmit} variant="contained">
              Add Organization
            </LoadingButton> */}
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
