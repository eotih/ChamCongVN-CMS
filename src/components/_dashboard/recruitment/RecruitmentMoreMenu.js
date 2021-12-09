/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from '../../../functions/Axios';
// ----------------------------------------------------------------------

export default function RecruitmentMoreMenu(Recruitment) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    position: 'relative',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      RecruitmentID: '',
      StateID: '',
      UpdatedBy: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Organization/EditRecruitment`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Updated') {
            alert('Recruitment Updated');
            window.location.reload();
          } else {
            alert('Recruitment not Updated');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const { RecruitmentID } = Recruitment.dulieu;
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
            if (confirm('Are you sure you want to delete this Recruitment?')) {
              axios
                .delete(`Employee/DeleteRecruitment?ID=${Recruitment.dulieu.RecruitmentID}`)
                .then((res) => {
                  if (res.data.Status === 'Delete') {
                    alert('Recruitment Deleted');
                    window.location.reload();
                  } else {
                    alert('Recruitment Not Deleted');
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
          to={`/employee/recruitments/add_recruit/${RecruitmentID}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Recruit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
