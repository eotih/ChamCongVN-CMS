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
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { LoadingButton } from '@mui/lab';
import axios from '../../../functions/Axios';
// --------------------------------------------------
// ----------------------------------------------------------------------

export default function LaudatoryMoreMenu() {
  const ref = useRef(null);
  const [employee, setEmployee] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [laudate, setLauDate] = React.useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const convertDateTime = (date) => {
    const newDate = new Date(date);
    const hour = newDate.getHours();
    const min = newDate.getMinutes();
    const sec = newDate.getSeconds();
    return `${hour}:${min}:${sec}`;
  };
  const style = {
    position: 'relative',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      EmployeeID: '',
      LaudatoryName: '',
      LaudatoryDate: convertDateTime(laudate),
      Reason: '',
      Amount: '',
      CreatedBy: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Salary/AddOrEditLaudatoryEmployee`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Success') {
            alert('Thêm thành công');
            window.location.reload();
          } else {
            alert('Thêm thất bại');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
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
