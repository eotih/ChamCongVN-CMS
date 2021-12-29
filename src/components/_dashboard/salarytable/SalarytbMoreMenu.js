/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Box,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { LoadingButton } from '@mui/lab';
import axios from '../../../functions/Axios';
// ----------------------------------------------------------------------

export default function SalarytbMoreMenu({ dulieu, handleOpenToast, emailLoginUser }) {
  const { SalaryTableID, SalaryTableName, MinSalary, TotalTimeRegulation, Year, Month } = dulieu;
  const [year, setYear] = useState([]);
  const [month, setMonth] = React.useState('');
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'relative',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const convertDate = (date) => {
    const newDate = new Date(date);
    const years = newDate.getFullYear();
    return `${years}`;
  };
  const formik = useFormik({
    initialValues: {
      SalaryTableID: '',
      SalaryTableName: '',
      Month: '',
      Year: convertDate(year),
      MinSalary: '',
      TotalTimeRegulation: '',
      UpdatedBy: emailLoginUser,
      remember: true
    },
    onSubmit: () => {
      setLoading(true);
      axios
        .put(`Salary/SalaryTable/${SalaryTableID}`, {
          SalaryTableID: formik.values.SalaryTableID,
          SalaryTableName: formik.values.SalaryTableName,
          Month: formik.values.Month,
          MinSalary: formik.values.MinSalary,
          TotalTimeRegulation: formik.values.TotalTimeRegulation,
          UpdatedBy: emailLoginUser,
          Year: convertDate(year)
        })
        .then((res) => {
          if (res.data.Status === 200) {
            setOpen(false);
            handleOpenToast({
              isOpen: true,
              horizontal: 'right',
              vertical: 'top',
              message: 'Successfully updated',
              color: 'info'
            })();
            formik.resetForm();
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
  });
  const handleOpen = () => {
    formik.setFieldValue('SalaryTableID', SalaryTableID);
    formik.setFieldValue('SalaryTableName', SalaryTableName);
    formik.setFieldValue('MinSalary', MinSalary);
    formik.setFieldValue('TotalTimeRegulation', TotalTimeRegulation);
    formik.setFieldValue('Year', Year);
    formik.setFieldValue('Month', Month);
    setYear(new Date(`12/12/${Year} 10:00:00`));
    setMonth(Month);
    setOpen(true);
  };
  const handleChange = (event) => {
    formik.setFieldValue('Month', event.target.value);
    setMonth(event.target.value);
  };
  const { handleSubmit, getFieldProps } = formik;
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            if (confirm('Are you sure you want to delete this salary table?')) {
              axios.delete(`Salary/SalaryTable/${SalaryTableID}`).then((res) => {
                if (res.data.Status === 200) {
                  handleOpenToast({
                    isOpen: true,
                    horizontal: 'right',
                    vertical: 'top',
                    message: 'Successfully deleted',
                    color: 'warning'
                  })();
                } else {
                  handleOpenToast({
                    isOpen: true,
                    horizontal: 'right',
                    vertical: 'top',
                    message: 'Fail deleted',
                    color: 'error'
                  })();
                }
              });
            }
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={handleOpen}
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Modal
          open={open}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={style}>
                <Stack spacing={1}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Salary Table
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Salary Table Name"
                      {...getFieldProps('SalaryTableName')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Month</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={month}
                        label="Month"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                      </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={['year']}
                        label="Year"
                        value={year}
                        onChange={(newValue) => {
                          setYear(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Min Salary"
                      {...getFieldProps('MinSalary')}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Total Time Regulation"
                      {...getFieldProps('TotalTimeRegulation')}
                      variant="outlined"
                    />
                  </Stack>
                  <LoadingButton
                    loading={loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Edit Salary Table
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal>
      </Menu>
    </>
  );
}
