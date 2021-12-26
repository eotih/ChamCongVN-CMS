/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CircularProgress from '@mui/material/CircularProgress';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { LoadingButton } from '@mui/lab';
import axios from '../../functions/Axios';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  SalarytbListHead,
  SalarytbListToolbar,
  SalarytbMoreMenu
} from '../../components/_dashboard/salarytable';
import { getAllSalaryTables } from '../../functions/Salary';
import Toast from '../../components/Toast';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'SalaryTableID', label: 'SalaryTableID', alignRight: false },
  { id: 'SalaryTableName', label: 'SalaryTable Name', alignRight: false },
  { id: 'Month', label: 'Month', alignRight: false },
  { id: 'Year', label: 'Year', alignRight: false },
  { id: 'SalaryPerHour', label: 'Salary/Hour', alignRight: false },
  { id: 'OTCoefficient', label: 'OTCoefficient', alignRight: false },
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
    return filter(array, (_user) => _user.Month.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [year, setYear] = React.useState(new Date());
  const [month, setMonth] = React.useState('');
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [salarytable, setSalaryTable] = useState([]);
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
    getAllSalaryTables().then((res) => {
      setSalaryTable(res);
      setIsLoaded(true);
    });
  }, [salarytable]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((n) => n.SalaryTableID);
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
  const convertDate = (date) => {
    const newDate = new Date(date);
    const years = newDate.getFullYear();
    return `${years}`;
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
      SalaryTableName: '',
      Month: '',
      Year: convertDate(year),
      SalaryPerHour: '',
      OTCoefficient: '',
      CreatedBy: '',
      remember: true
    },
    onSubmit: () => {
      setLoading(true);
      axios
        .post(`Salary/SalaryTable`, {
          SalaryTableName: formik.values.SalaryTableName,
          Month: formik.values.SalaryTableName,
          SalaryPerHour: formik.values.SalaryTableName,
          OTCoefficient: formik.values.SalaryTableName,
          Year: convertDate(year)
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
    if (confirm(`Are you sure you want to delete ${selected.length} salary table?`)) {
      const list = selected.map((item) => {
        if (item.headline === data.headline) {
          axios.delete(`salary/SalaryTable/${item}`).then((res) => {
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
  const handleChange = (event) => {
    formik.setFieldValue('Month', event.target.value);
    setMonth(event.target.value);
  };
  const { handleSubmit, getFieldProps } = formik;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - salarytable.length) : 0;

  const filteredUsers = applySortFilter(salarytable, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Salary Table | ChamCongVN">
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
                  Add Salary Table
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Salary Table Name"
                    {...getFieldProps('SalaryTableName')}
                    variant="outlined"
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={month}
                      label="Month"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>January</MenuItem>
                      <MenuItem value={2}>February</MenuItem>
                      <MenuItem value={3}>March</MenuItem>
                      <MenuItem value={4}>April</MenuItem>
                      <MenuItem value={5}>May</MenuItem>
                      <MenuItem value={6}>June</MenuItem>
                      <MenuItem value={7}>July</MenuItem>
                      <MenuItem value={8}>August</MenuItem>
                      <MenuItem value={9}>September</MenuItem>
                      <MenuItem value={10}>October</MenuItem>
                      <MenuItem value={11}>November</MenuItem>
                      <MenuItem value={12}>December</MenuItem>
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={['year']}
                      label="Year"
                      value={year}
                      onChange={(newValue) => {
                        setYear(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                  </LocalizationProvider>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Min Salary"
                    {...getFieldProps('SalaryPerHour')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Total Time Regulation"
                    {...getFieldProps('OTCoefficient')}
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
                  Add Salary Table
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Salary Table
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Salary Table
          </Button>
        </Stack>

        <Card>
          <SalarytbListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SalarytbListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        SalaryTableID,
                        SalaryTableName,
                        Month,
                        Year,
                        SalaryPerHour,
                        OTCoefficient
                      } = row;
                      const isItemSelected = selected.indexOf(SalaryTableID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={SalaryTableID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, SalaryTableID)}
                            />
                          </TableCell>
                          <TableCell align="left">{SalaryTableID}</TableCell>
                          <TableCell align="left">{SalaryTableName}</TableCell>
                          <TableCell align="left">{Month}</TableCell>
                          <TableCell align="left">{Year}</TableCell>
                          <TableCell align="left">{SalaryPerHour}</TableCell>
                          <TableCell align="left">{OTCoefficient}</TableCell>
                          <TableCell align="right">
                            <SalarytbMoreMenu dulieu={row} handleOpenToast={handleOpenToast} />
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
            count={filteredUsers.length}
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
