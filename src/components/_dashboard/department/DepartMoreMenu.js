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
import axios from '../../../functions/Axios';
// ----------------------------------------------------------------------

export default function DepartMoreMenu(Department) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'relative',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      DepartmentName: '',
      Note: '',
      Phone: ''
    },
    onSubmit: () => {
      axios
        .post(`Component/AddOrEditDepartment`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Department Updated');
            window.location.reload();
          } else {
            alert('Department not Update');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const handleOpen = () => {
    formik.setFieldValue('DepartmentID', Department.dulieu.DepartmentID);
    formik.setFieldValue('DepartmentName', Department.dulieu.DepartmentName);
    formik.setFieldValue('Note', Department.dulieu.Note);
    formik.setFieldValue('Phone', Department.dulieu.Phone);
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
            if (confirm('Are you sure you want to delete this department?')) {
              axios
                .delete(`Component/DeleteDepartment?ID=${Department.dulieu.DepartmentID}`)
                .then((res) => {
                  if (res.data.Status === 'Delete') {
                    alert('Department Deleted');
                    window.location.reload();
                  } else {
                    alert('Department Not Deleted');
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
                    Edit Department
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Department Name"
                      {...getFieldProps('DepartmentName')}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Phone"
                      {...getFieldProps('Phone')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Note"
                      {...getFieldProps('Note')}
                      variant="outlined"
                    />
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit Department
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
