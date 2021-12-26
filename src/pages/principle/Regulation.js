/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import CircularProgress from '@mui/material/CircularProgress';
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
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { LoadingButton } from '@mui/lab';
import axios from '../../functions/Axios';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  RegulationListHead,
  RegulationListToolbar,
  RegulationMoreMenu
} from '../../components/_dashboard/regulation';
import { getAllRegulations } from '../../functions/Principle';
import { getAllEmployees } from '../../functions/Employee';
import { convertDate } from '../../utils/formatDatetime';
import Toast from '../../components/Toast';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'RegulationEmployeeID', label: 'RegulationEmployeeID', alignRight: false },
  { id: 'Employee', label: 'Employee', alignRight: false },
  { id: 'RegulationName', label: 'Regulation Name', alignRight: false },
  { id: 'RegulationDate', label: 'Regulation Date', alignRight: false },
  { id: 'RegulationFormat', label: 'Regulation Format', alignRight: false },
  { id: 'Reason', label: 'Reason', alignRight: false },
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
      (_user) => _user.FullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Regulation() {
  const [page, setPage] = useState(0);
  const [date, setDate] = React.useState(new Date());
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [regulation, setRegulation] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    getAllEmployees().then((res) => {
      setEmployee(res);
    });
    setOpen(true);
  };
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
    getAllRegulations().then((res) => {
      setRegulation(res);
      setIsLoaded(true);
    });
  }, [regulation]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredregulations.map(
        (n) => n.RegulationEmployees.RegulationEmployeeID
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleDelete = (data) => {
    if (confirm(`Are you sure you want to delete ${selected.length} regulation?`)) {
      const list = selected.map((item) => {
        if (item.headline === data.headline) {
          axios.delete(`Principle/RegulationEmployee/${item}`).then((res) => {
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
      EmployeeID: '',
      RegulationName: '',
      RegulationDate: date,
      RegulationFormat: '',
      Reason: '',
      CreatedBy: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Principle/RegulationEmployees`, {
          EmployeeID: formik.values.EmployeeID,
          RegulationName: formik.values.RegulationName,
          Reason: formik.values.Reason,
          RegulationFormat: formik.values.RegulationFormat,
          CreatedBy: formik.values.CreatedBy,
          RegulationDate: date
        })
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
              message: 'Fail added',
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
  const { handleSubmit, getFieldProps } = formik;

  const handleChange = (event) => {
    formik.setFieldValue('EmployeeID', event.target.value);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - regulation.length) : 0;

  const filteredregulations = applySortFilter(
    regulation,
    getComparator(order, orderBy),
    filterName
  );

  const isregulationNotFound = filteredregulations.length === 0;
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Regulation | ChamCongVN">
      {openToast.isOpen === true && <Toast open={openToast} handleCloseToast={handleCloseToast} />}
      <Container>
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
                    Add Regulation
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Regulation Name"
                      {...getFieldProps('RegulationName')}
                      variant="outlined"
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
                      <Select
                        labelId="select-label"
                        label="Employee"
                        {...getFieldProps('EmployeeID')}
                        variant="outlined"
                        onChange={handleChange}
                      >
                        {employee.map((item) => (
                          <MenuItem key={item.emp.EmployeeID} value={item.emp.EmployeeID}>
                            {item.emp.FullName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Regulation Date"
                        views={['day', 'month', 'year']}
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <TextField
                      fullWidth
                      label="Regulation Format"
                      {...getFieldProps('RegulationFormat')}
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Reason"
                      {...getFieldProps('Reason')}
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
                    Add Regulation
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Regulation
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Regulation
          </Button>
        </Stack>

        <Card>
          <RegulationListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RegulationListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredregulations.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredregulations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        RegulationEmployeeID,
                        RegulationName,
                        RegulationDate,
                        Reason,
                        RegulationFormat
                      } = row.RegulationEmployees;
                      const { FullName, Image } = row;
                      const isItemSelected = selected.indexOf(RegulationEmployeeID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={RegulationEmployeeID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, RegulationEmployeeID)}
                            />
                          </TableCell>
                          <TableCell align="left">{RegulationEmployeeID}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={FullName} src={Image} />
                              <Typography variant="subtitle2" noWrap>
                                {FullName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{RegulationName}</TableCell>
                          <TableCell align="left">{convertDate(RegulationDate)}</TableCell>
                          <TableCell align="left">{RegulationFormat}</TableCell>
                          <TableCell align="left">{Reason}</TableCell>
                          <TableCell align="right">
                            <RegulationMoreMenu dulieu={row} handleOpenToast={handleOpenToast} />
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
                {isregulationNotFound && (
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
            count={filteredregulations.length}
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
