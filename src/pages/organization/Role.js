/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  TextField,
  Box
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import axios from '../../functions/Axios';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { RoleListHead, RoleListToolbar, RoleMoreMenu } from '../../components/_dashboard/role';
import { getAllRole } from '../../functions/Organization';
import Toast from '../../components/Toast';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'RoleID', label: 'RoleID', alignRight: false },
  { id: 'RoleName', label: 'Role Name', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.RoleName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Role() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [role, setRole] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openToast, setOpenToast] = useState({
    isOpen: false,
    vertical: 'top',
    message: '',
    color: '',
    horizontal: 'right'
  });

  const handleOpenToast = (newState) => () => {
    setOpenToast({ isOpen: true, ...newState });
  };
  const handleCloseToast = () => {
    setOpenToast({ ...openToast, isOpen: false });
  };
  useEffect(() => {
    getAllRole().then((res) => {
      setRole(res);
      setIsLoaded(true);
    });
  }, [role]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredRoles.map((n) => n.RoleID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
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
      RoleName: '',
      remember: true
    },
    onSubmit: () => {
      setLoading(true);
      axios
        .post(`Organization/Role`, formik.values)
        .then((res) => {
          if (res.data.Status === 200) {
            setOpen(false);
            handleOpenToast({
              isOpen: true,
              horizontal: 'right',
              vertical: 'top',
              message: 'Successfully added',
              color: 'success'
            })();
            formik.resetForm();
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
  });
  const handleDelete = (data) => {
    if (confirm(`Are you sure you want to delete ${selected.length} roles?`)) {
      const list = selected.map((item) => {
        if (item.headline === data.headline) {
          axios.delete(`Organization/Role/${item}`).then((res) => {
            if (res.data.Status === 200) {
              setOpen(false);
              handleOpenToast({
                isOpen: true,
                horizontal: 'right',
                vertical: 'top',
                message: 'Successfully deleted',
                color: 'info'
              })();
              setLoading(false);
              setSelected([]);
            } else {
              handleOpenToast({
                isOpen: true,
                horizontal: 'right',
                vertical: 'top',
                message: 'Fail deleted',
                color: 'error'
              })();
              setLoading(false);
            }
          });
        }
      });
    }
  };
  const { handleSubmit, getFieldProps } = formik;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - role.length) : 0;

  const filteredRoles = applySortFilter(role, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredRoles.length === 0;
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Role | ChamCongVN">
      {openToast.isOpen === true && <Toast open={openToast} handleCloseToast={handleCloseToast} />}
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
                  Add Role
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Role Name"
                    {...getFieldProps('RoleName')}
                    variant="outlined"
                  />
                </Stack>
                <LoadingButton
                  loading={loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add Role
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Role
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Role
          </Button>
        </Stack>

        <Card>
          <RoleListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RoleListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredRoles.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredRoles
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { RoleID, RoleName } = row;
                      const isItemSelected = selected.indexOf(RoleID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={RoleID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, RoleID)}
                            />
                          </TableCell>
                          <TableCell align="left">{RoleID}</TableCell>
                          <TableCell align="left">{RoleName}</TableCell>
                          <TableCell align="right">
                            <RoleMoreMenu dulieu={row} handleOpenToast={handleOpenToast} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRoles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
