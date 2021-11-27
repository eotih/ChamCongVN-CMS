import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
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
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LoadingButton } from '@mui/lab';
import axios from '../../../functions/Axios';
import { getAllEmployees } from '../../../functions/Employee';
// --------------------------------------------------
// ----------------------------------------------------------------------

export default function LaudatoryMoreMenu(Laudatory) {
  const ref = useRef(null);
  const [employee, setEmployee] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [laudate, setLauDate] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getAllEmployees().then((res) => {
      setEmployee(res);
    });
  }, []);
  const style = {
    position: 'relative',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      LaudatoryEmployeeID: '',
      EmployeeID: '',
      LaudatoryName: '',
      LaudatoryDate: laudate,
      Reason: '',
      Amount: '',
      CreatedBy: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Salary/AddOrEditLaudatoryEmployee`, {
          LaudatoryEmployeeID: formik.values.LaudatoryEmployeeID,
          EmployeeID: formik.values.EmployeeID,
          LaudatoryName: formik.values.LaudatoryName,
          Reason: formik.values.Reason,
          Amount: formik.values.Amount,
          UpdatedBy: formik.values.UpdatedBy,
          LaudatoryDate: laudate
        })
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Laudatory Updated');
            window.location.reload();
          } else {
            alert('Laudatory not Updated');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const handleOpen = () => {
    formik.setFieldValue(
      'LaudatoryEmployeeID',
      Laudatory.dulieu.LaudatoryEmployee.LaudatoryEmployeeID
    );
    formik.setFieldValue('LaudatoryName', Laudatory.dulieu.LaudatoryEmployee.LaudatoryName);
    formik.setFieldValue('Reason', Laudatory.dulieu.LaudatoryEmployee.Reason);
    formik.setFieldValue('Amount', Laudatory.dulieu.LaudatoryEmployee.Amount);
    formik.setFieldValue('EmployeeID', Laudatory.dulieu.EmployeeID);
    setLauDate(new Date(`${Laudatory.dulieu.LaudatoryEmployee.LaudatoryDate}`));
    setOpen(true);
  };
  const { handleSubmit, getFieldProps } = formik;
  const handleChange = (event) => {
    formik.setFieldValue('EmployeeID', event.target.value);
    setEmployees(event.target.value);
  };

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
        <MenuItem sx={{ color: 'text.secondary' }}>
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
                    Edit Laudatory
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Laudatory Name"
                      {...getFieldProps('LaudatoryName')}
                      variant="outlined"
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
                      <Select
                        labelId="select-label"
                        label="Employee"
                        value={employees}
                        {...getFieldProps('EmployeeID')}
                        variant="outlined"
                        onChange={handleChange}
                      >
                        {employee.map((item) => (
                          <MenuItem key={item.emp.EmployeeID} value={item.emp.EmployeeID}>
                            {item.emp.FullName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Laudatory Date"
                        views={['day', 'month', 'year']}
                        value={laudate}
                        onChange={(newValue) => {
                          setLauDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <TextField
                      fullWidth
                      label="Amount"
                      {...getFieldProps('Amount')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Reason"
                      {...getFieldProps('Reason')}
                      variant="outlined"
                    />
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit Laudatory
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
