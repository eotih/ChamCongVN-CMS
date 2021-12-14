/* eslint-disable no-restricted-globals */
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
  FormControl,
  InputLabel,
  Select,
  Typography,
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import axios from '../../../functions/Axios';
import { convertTime } from '../../../utils/formatDatetime';
import { getAllDepartments } from '../../../functions/Component';
// ----------------------------------------------------------------------

export default function OvertimeMoreMenu(Overtime) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [timeStart, setTimeStart] = useState([]);
  const [timeEnd, setTimeEnd] = useState([]);
  const [department, setDepartment] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getAllDepartments().then((res) => {
      setDepartment(res);
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
      OverTimeID: '',
      OvertimeName: '',
      DepartmentID: '',
      IsActive: '',
      Quantity: '',
      CreatedBy: '',
      OverTimeDate: date,
      StartTime: convertTime(timeStart),
      EndTime: convertTime(timeEnd)
    },
    onSubmit: () => {
      axios
        .post(`Organization/AddOrEditOvertime`, {
          OverTimeID: formik.values.OverTimeID,
          OvertimeName: formik.values.OvertimeName,
          DepartmentID: formik.values.DepartmentID,
          IsActive: formik.values.IsActive,
          Quantity: formik.values.Quantity,
          OverTimeDate: date,
          StartTime: convertTime(timeStart),
          EndTime: convertTime(timeEnd)
        })
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Overtime Updated');
            window.location.reload();
          } else {
            alert('Overtime not Updated');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const handleChangeIsActive = (event) => {
    formik.setFieldValue('IsActive', event.target.value);
  };
  const handleChangeDepartment = (event) => {
    setDepartments(event.target.value);
  };
  const {
    OverTimeID,
    OverTimeDate,
    OverTimeName,
    StartTime,
    EndTime,
    Quantity,
    IsActive,
    DepartmentID
  } = Overtime.dulieu.Overtime;
  const handleOpen = () => {
    formik.setFieldValue('OverTimeID', OverTimeID);
    formik.setFieldValue('OvertimeName', OverTimeName);
    formik.setFieldValue('OverTimeDate', OverTimeDate);
    formik.setFieldValue('StartTime', StartTime);
    formik.setFieldValue('EndTime', EndTime);
    formik.setFieldValue('Quantity', Quantity);
    formik.setFieldValue('IsActive', IsActive);
    formik.setFieldValue('DepartmentID', DepartmentID);
    setTimeStart(new Date(`12/12/2000 ${StartTime}`));
    setTimeEnd(new Date(`12/12/2000 ${EndTime}`));
    setOpen(true);
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
            if (confirm('Are you sure you want to delete this Overtime?')) {
              axios.delete(`Organization/DeleteOvertime?ID=${OverTimeID}`).then((res) => {
                if (res.data.Status === 'Delete') {
                  alert('Overtime Deleted');
                  window.location.reload();
                } else {
                  alert('Overtime Not Deleted');
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
                    Edit Overtime
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Overtime Name"
                      {...getFieldProps('OvertimeName')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Department</InputLabel>
                      <Select
                        labelId="select-label"
                        label="Employee"
                        values={departments}
                        {...getFieldProps('DepartmentID')}
                        variant="outlined"
                        onChange={handleChangeDepartment}
                      >
                        {department.map((item) => (
                          <MenuItem key={item.DepartmentID} value={item.DepartmentID}>
                            {item.DepartmentName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="OverTime Date"
                        views={['day', 'month', 'year']}
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Time Start"
                        views={['hours', 'minutes', 'seconds']}
                        inputFormat="HH:mm:ss"
                        value={timeStart}
                        onChange={(newValue) => {
                          setTimeStart(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Time End"
                        value={timeEnd}
                        views={['hours', 'minutes', 'seconds']}
                        inputFormat="HH:mm:ss"
                        onChange={(newValue) => {
                          setTimeEnd(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">IsActive</InputLabel>
                      <Select
                        labelId="select-label"
                        label="IsActive"
                        {...getFieldProps('IsActive')}
                        variant="outlined"
                        onChange={handleChangeIsActive}
                      >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>No Active</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Quantity"
                      {...getFieldProps('Quantity')}
                      variant="outlined"
                    />
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit Overtime
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
