/* eslint-disable no-restricted-globals */
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
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import axios from '../../../functions/Axios';
import { convertTime } from '../../../utils/formatDatetime';
// ----------------------------------------------------------------------

export default function ShiftMoreMenu(Shift) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [timeStart, setTimeStart] = useState([]);
  const [timeEnd, setTimeEnd] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const convertTime = (date) => {
    const newDate = new Date(date);
    const hour = newDate.getHours();
    const min = newDate.getMinutes();
    const sec = newDate.getSeconds();
    return `${hour}:${min}:${sec}`;
  };
  const style = {
    position: 'relative',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      ShiftID: '',
      ShiftName: '',
      StartShift: convertTime(timeStart),
      EndShift: convertTime(timeEnd)
    },
    onSubmit: () => {
      axios
        .post(`Organization/Shift`, {
          ShiftID: formik.values.ShiftID,
          ShiftName: formik.values.ShiftName,
          StartShift: convertTime(timeStart),
          EndShift: convertTime(timeEnd)
        })
        .then((res) => {
          if (res.data.Status === 200) {
            alert('Shift Updated');
            window.location.reload();
          } else {
            alert('Shift not Updated');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const handleOpen = () => {
    formik.setFieldValue('ShiftID', Shift.dulieu.ShiftID);
    formik.setFieldValue('ShiftName', Shift.dulieu.ShiftName);
    formik.setFieldValue('StartShift', Shift.dulieu.StartShift);
    formik.setFieldValue('EndShift', Shift.dulieu.EndShift);
    setTimeStart(new Date(`12/12/2000 ${Shift.dulieu.StartShift}`));
    setTimeEnd(new Date(`12/12/2000 ${Shift.dulieu.EndShift}`));
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
            if (confirm('Are you sure you want to delete this shift?')) {
              axios.delete(`Organization/DeleteShift?ID=${Shift.dulieu.ShiftID}`).then((res) => {
                if (res.data.Status === 200) {
                  alert('Shift Deleted');
                  window.location.reload();
                } else {
                  alert('Shift Not Deleted');
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
                    Edit Shift
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Shift Name"
                      {...getFieldProps('ShiftName')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Time Start"
                        views={['hours', 'minutes', 'seconds']}
                        value={timeStart}
                        inputFormat="HH:mm:ss"
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
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit Shift
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
