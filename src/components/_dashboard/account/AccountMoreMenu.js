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
import { LoadingButton } from '@mui/lab';
import axios from '../../../functions/Axios';
// ----------------------------------------------------------------------

export default function AccountMoreMenu(Account) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [role, setRole] = React.useState('');
  const [state, setState] = React.useState('');
  const [employee, setEmployee] = React.useState('');

  const style = {
    position: 'relative',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      AccountName: '',
      Note: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Component/AddOrEditAccounts`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Account Updated');
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
  const handleOpen = () => {
    formik.setFieldValue('AccountID', Account.dulieu.AccountID);
    formik.setFieldValue('AccountName', Account.dulieu.AccountName);
    formik.setFieldValue('Note', Account.dulieu.Note);
    setOpen(true);
  };
  const { handleSubmit, getFieldProps } = formik;

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const handleChangeState = (event) => {
    setState(event.target.value);
  };
  const handleChangeEmployee = (event) => {
    setEmployee(event.target.value);
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
          {' '}
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
                    Add Account
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Email"
                      {...getFieldProps('Email')}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      {...getFieldProps('Password')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={employee}
                        label="Employee"
                        onChange={handleChangeEmployee}
                      >
                        <MenuItem value={1}>Hieu</MenuItem>
                        <MenuItem value={2}>Thanh</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={handleChangeRole}
                      >
                        <MenuItem value={1}>Admin</MenuItem>
                        <MenuItem value={2}>Staff</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">State</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state}
                        label="State"
                        onChange={handleChangeState}
                      >
                        <MenuItem value={1}>Approved</MenuItem>
                        <MenuItem value={2}>NotApproved</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Add Account
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
