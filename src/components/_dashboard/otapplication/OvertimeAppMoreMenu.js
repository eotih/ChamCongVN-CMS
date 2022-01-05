/* eslint-disable no-restricted-globals */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import checkmarkCircleFill from '@iconify/icons-eva/checkmark-circle-fill';
import closeCircleOutline from '@iconify/icons-eva/close-circle-outline';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from '../../../functions/Axios';
// ----------------------------------------------------------------------

export default function OvertimeAppMoreMenu({ dulieu, handleOpenToast, emailLoginUser }) {
  const { OverTimeApplicationID } = dulieu.OverTimeApplications;
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
            if (confirm('Are you sure you want to delete this Overtime Application?')) {
              axios
                .delete(`Application/OverTimeApplication/${OverTimeApplicationID}`)
                .then((res) => {
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
          onClick={() => {
            if (confirm('Are you sure you want to approve this Overtime Application?')) {
              axios
                .put(`Application/OverTimeApplication/EditState/${OverTimeApplicationID}`, {
                  OverTimeApplicationID,
                  StateID: 2,
                  UpdatedBy: emailLoginUser
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
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={checkmarkCircleFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Approved" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (confirm('Are you sure you do not want to approve this Overtime Application?')) {
              axios
                .put(`Application/AbsentApplication/EditState/${OverTimeApplicationID}`, {
                  OverTimeApplicationID,
                  StateID: 3,
                  UpdatedBy: emailLoginUser
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
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={closeCircleOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Not Approved" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
