/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import React, { useRef, useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import morehorizontalfill from '@iconify/icons-eva/more-horizontal-fill';
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
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from '../../../functions/Axios';
import { getAllSpecialities, getAllDegrees } from '../../../functions/Component';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function EmployeeMoreMenu({ dulieu, handleOpenToast }) {
  const { EmployeeID } = dulieu.emp;
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDegrees, setOpenDegrees] = useState(false);
  const handleOpenSpecialities = () => {
    setOpen(true);
    getAllSpecialities().then((res) => {
      setSpecialty(res);
    });
    setPersonName(dulieu.ListSpeciality);
  };
  const handleOpenDegrees = () => {
    setOpenDegrees(true);
    getAllDegrees().then((res) => {
      setSpecialty(res);
      console.log(res);
    });
    setPersonName(dulieu.ListDegree);
  };
  const handleClose = () => setOpen(false);
  const [personName, setPersonName] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  useEffect(() => {
    formik.setFieldValue('EmployeeID', EmployeeID);
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
      EmployeeID: '',
      SpecialtyID: ''
    },
    onSubmit: () => {
      const array = {
        EmployeeID: '',
        SpecialtyID: ''
      };
      personName.forEach((item) => {
        array.EmployeeID = formik.values.EmployeeID;
        array.SpecialtyID = item.SpecialtyID;
        axios.post('Component/SpecialityDetail', array).then((res) => {
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
              message: 'Something went wrong',
              color: 'error'
            })();
            setLoading(false);
          }
        });
      });
    }
  });
  const { handleSubmit, getFieldProps } = formik;

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={morehorizontalfill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem
          onClick={() => {
            if (confirm('Are you sure you want to delete this employee?')) {
              axios.delete(`Employee/Employee/${EmployeeID}`).then((res) => {
                if (res.data.Status === 200) {
                  handleOpenToast({
                    isOpen: true,
                    horizontal: 'right',
                    vertical: 'top',
                    message: 'Successfully deleted',
                    color: 'warning'
                  })();
                  window.location.reload();
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
          component={RouterLink}
          to={`./editemployee/${EmployeeID}`}
          sx={{ color: 'text.secondary' }}
        >
          {' '}
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={handleOpenSpecialities} sx={{ color: 'text.secondary' }}>
          {' '}
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Specialities" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={handleOpenDegrees} sx={{ color: 'text.secondary' }}>
          {' '}
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Degrees" primaryTypographyProps={{ variant: 'body2' }} />
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
                    Add Specialities
                  </Typography>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Specialities</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Specialities" />}
                      renderValue={(selected) =>
                        selected.map((res) => res.SpecialtyName).join(', ')
                      }
                      MenuProps={MenuProps}
                    >
                      {specialty.map((name) => (
                        <MenuItem key={name.SpecialtyID} value={name}>
                          <Checkbox
                            checked={personName
                              .map((res) => res.SpecialtyName)
                              .includes(name.SpecialtyName)}
                          />
                          <ListItemText primary={name.SpecialtyName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <LoadingButton
                    loading={loading}
                    onClick={() => formik.setFieldValue('SpecialtyID', personName)}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add Specialities
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal>
        <Modal
          open={openDegrees}
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
                    Add Degree
                  </Typography>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Degree</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Degree" />}
                      renderValue={(selected) => selected.map((res) => res.DegreeName).join(', ')}
                      MenuProps={MenuProps}
                    >
                      {specialty.map((name) => (
                        <MenuItem key={name.DegreeID} value={name}>
                          <Checkbox
                            checked={personName
                              .map((res) => res.DegreeName)
                              .includes(name.DegreeName)}
                          />
                          <ListItemText primary={name.DegreeName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <LoadingButton
                    loading={loading}
                    onClick={() => formik.setFieldValue('DegreeID', personName)}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add Degree
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
