/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
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
  Box,
  Input,
  FormControl
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import axios from '../../functions/Axios';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  OrganizationListHead,
  OrganizationListToolbar,
  OrganizationMoreMenu
} from '../../components/_dashboard/organization';
import { getAllOrganization } from '../../functions/Organization';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'OrganizationID', label: 'OrganizationID', alignRight: false },
  { id: 'Name', label: 'Name', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'Latitude', label: 'Latitude', alignRight: false },
  { id: 'Longitude', label: 'Longitude', alignRight: false },
  { id: 'Website', label: 'Website', alignRight: false },
  { id: 'PublicIP', label: 'PublicIP', alignRight: false },
  { id: 'PythonIP', label: 'PythonIP', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Organization() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [organization, setOrganization] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllOrganization().then((res) => {
      setOrganization(res);
    });
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = organization.map((n) => n.name);
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
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      Name: '',
      Logo: '',
      Email: '',
      Latitude: '',
      Longitude: '',
      Website: '',
      PublicIP: '',
      PythonIP: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Organization/AddOrEditOrganization`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Success') {
            alert('Thêm thành công');
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
  const { handleSubmit, getFieldProps } = formik;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - organization.length) : 0;

  const filteredUsers = applySortFilter(organization, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Organization | ChamCongVN">
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
              <Stack spacing={3}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Organization
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="Name" {...getFieldProps('Name')} variant="outlined" />
                  <TextField label="Website" {...getFieldProps('Website')} variant="outlined" />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="PublicIP" {...getFieldProps('PublicIP')} variant="outlined" />
                  <TextField label="PythonIP" {...getFieldProps('PythonIP')} variant="outlined" />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="Latitude" {...getFieldProps('Latitude')} variant="outlined" />
                  <TextField label="Longitude" {...getFieldProps('Longitude')} variant="outlined" />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="Email" {...getFieldProps('Email')} variant="outlined" />
                </Stack>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent="flex-end"
                >
                  <Avatar src={formik.values.Logo} sx={{ width: 50, height: 50 }} />
                  <label htmlFor="contained-button-file">
                    <Input
                      id="contained-button-file"
                      type="file"
                      onChange={(e) => {
                        const { files } = e.target;
                        const reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = (e) => {
                          formik.setFieldValue('Logo', e.target.result);
                        };
                      }}
                    />
                    <Button variant="contained" component="span">
                      Upload Logo
                    </Button>
                  </label>
                </Stack>
                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                  Add Organization
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Organization
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Organization
          </Button>
        </Stack>

        <Card>
          <OrganizationListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OrganizationListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={organization.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {organization
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        OrganizationID,
                        Name,
                        Logo,
                        Email,
                        Latitude,
                        Longitude,
                        Website,
                        PublicIP,
                        PythonIP
                      } = row;
                      const isItemSelected = selected.indexOf(Name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={OrganizationID}
                          tabIndex={-1}
                          organization="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, Name)}
                            />
                          </TableCell>
                          <TableCell align="left">{OrganizationID}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={Name} src={Logo} />
                              <Typography variant="subtitle2" noWrap>
                                {Name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{Email}</TableCell>
                          <TableCell align="left">{Latitude}</TableCell>
                          <TableCell align="left">{Longitude}</TableCell>
                          <TableCell align="left">{Website}</TableCell>
                          <TableCell align="left">{PublicIP}</TableCell>
                          <TableCell align="left">{PythonIP}</TableCell>
                          <TableCell align="right">
                            <OrganizationMoreMenu dulieu={row} />
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
            count={organization.length}
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