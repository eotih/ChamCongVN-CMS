/* eslint-disable no-restricted-globals */
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
import { LoadingButton } from '@mui/lab';
import axios from '../../../functions/Axios';
import { getAllEmployees } from '../../../functions/Employee';
import { getAllState } from '../../../functions/Component';
import { getAllRole } from '../../../functions/Organization';
// ----------------------------------------------------------------------

export default function AccountMoreMenu(Account) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [role, setRole] = useState([]);
  const [state, setState] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [roles, setRoles] = useState([]);
  const [states, setStates] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((res) => {
      setEmployee(res);
    });
    getAllRole().then((res) => {
      setRole(res);
    });
    getAllState().then((res) => {
      setState(res);
    });
  }, []);
  const style = {
    position: 'relative',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      AccountID: '',
      StateID: '',
      UpdatedBy: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Organization/EditAccount`, formik.values)
        .then((res) => {
          if (res.data.Status === 200) {
            alert('Account Updated');
            window.location.reload();
          } else {
            alert('Account not Updated');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const handleOpen = () => {
    const { AccountID, Email, StateID, EmployeeID, RoleID } = Account.dulieu.Account;
    const { FullName } = Account.dulieu.Employee;
    formik.setFieldValue('AccountID', AccountID);
    formik.setFieldValue('FullName', FullName);
    formik.setFieldValue('Email', Email);
    formik.setFieldValue('EmployeeID', EmployeeID);
    formik.setFieldValue('StateID', StateID);
    formik.setFieldValue('RoleID', RoleID);
    setOpen(true);
  };
  const { handleSubmit, getFieldProps } = formik;

  const handleChangeRole = (event) => {
    formik.setFieldValue('RoleID', event.target.value);
    setRoles(event.target.value);
  };
  const handleChangeState = (event) => {
    formik.setFieldValue('StateID', event.target.value);
    setStates(event.target.value);
  };
  const handleChangeEmployee = (event) => {
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
        <MenuItem
          onClick={() => {
            if (confirm('Are you sure you want to delete this account?')) {
              axios
                .delete(`Organization/DeleteAccount?ID=${Account.dulieu.Account.AccountID}`)
                .then((res) => {
                  if (res.data.Status === 200) {
                    alert('Account Deleted');
                    window.location.reload();
                  } else {
                    alert('Account Not Deleted');
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
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={employees}
                        {...getFieldProps('EmployeeID')}
                        label="Employee"
                        onChange={handleChangeEmployee}
                      >
                        {employee.map((item) => (
                          <MenuItem key={item.emp.EmployeeID} value={item.emp.EmployeeID}>
                            {item.emp.FullName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={roles}
                        {...getFieldProps('RoleID')}
                        label="Role"
                        onChange={handleChangeRole}
                      >
                        {role.map((item) => (
                          <MenuItem key={item.RoleID} value={item.RoleID}>
                            {item.RoleName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">State</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={states}
                        {...getFieldProps('StateID')}
                        label="State"
                        onChange={handleChangeState}
                      >
                        {state.map((item) => (
                          <MenuItem key={item.StateID} value={item.StateID}>
                            {item.StateName}
                          </MenuItem>
                        ))}
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
