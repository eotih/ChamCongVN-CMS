/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
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
  InputLabel,
  FormControl,
  Select,
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getAllPosition } from '../../../functions/Organization';
import axios from '../../../functions/Axios';
// ----------------------------------------------------------------------

export default function LevelMoreMenu(Level) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState([]);
  const [positions, setPositions] = useState([]);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getAllPosition().then((res) => {
      setPosition(res);
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
      LevelID: '',
      PositionID: '',
      LevelName: '',
      Coefficient: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Organization/AddOrEditLevel`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Level Updated');
            window.location.reload();
          } else {
            alert('Level not Updated');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const { LevelID, LevelName, Coefficient, PositionID } = Level.dulieu.Level;
  const handleOpen = () => {
    formik.setFieldValue('LevelID', LevelID);
    formik.setFieldValue('PositionID', PositionID);
    formik.setFieldValue('LevelName', LevelName);
    formik.setFieldValue('Coefficient', Coefficient);
    setOpen(true);
  };
  const handleChangePostion = (event) => {
    formik.setFieldValue('PositionID', event.target.value);
    setPositions(event.target.value);
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
            if (confirm('Are you sure you want to delete this Level?')) {
              axios.delete(`Organization/DeleteLevel?ID=${LevelID}`).then((res) => {
                if (res.data.Status === 'Delete') {
                  alert('Level Deleted');
                  window.location.reload();
                } else {
                  alert('Level Not Deleted');
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
                    Edit Level
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Position</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={positions}
                      {...getFieldProps('PositionID')}
                      label="Position"
                      onChange={handleChangePostion}
                    >
                      {position.map((item) => (
                        <MenuItem key={item.PositionID} value={item.PositionID}>
                          {item.PositionName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Level Name"
                      {...getFieldProps('LevelName')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Coefficient"
                      {...getFieldProps('Coefficient')}
                      variant="outlined"
                    />
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Edit Level
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
