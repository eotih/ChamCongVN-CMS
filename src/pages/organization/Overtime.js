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
  MenuItem,
  TableCell,
  InputLabel,
  Select,
  FormControl,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  TextField,
  Box
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import axios from '../../functions/Axios';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  OvertimeListHead,
  OvertimeListToolbar,
  OvertimeMoreMenu
} from '../../components/_dashboard/overtime';
import Toast from '../../components/Toast';
//

import { getAllOvertimes } from '../../functions/Organization';
import { getAllDepartments } from '../../functions/Component';
import { convertTime, convertDate } from '../../utils/formatDatetime';
import { accountContext } from '../../context/Hooks';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'OvertimeID', label: 'OvertimeID', alignRight: false },
  { id: 'OvertimeName', label: 'Overtime Name', alignRight: false },
  { id: 'Department', label: 'Department Name', alignRight: false },
  { id: 'StartTime', label: 'Start Time', alignRight: false },
  { id: 'EndTime', label: 'End Time', alignRight: false },
  { id: 'OverTimeDate', label: 'OverTime Date', alignRight: false },
  { id: 'Quantity', label: 'Quantity', alignRight: false },
  { id: 'IsActive', label: 'IsActive', alignRight: false },
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
      (_user) => _user.Overtime.OverTimeName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Overtime() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [overtime, setOvertime] = useState([]);
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    getAllDepartments().then((res) => {
      setDepartment(res);
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
  const account = accountContext();
  const emailLoginUser = account.Account.Email;
  const handleOpenToast = (newState) => () => {
    setOpenToast({ isOpen: true, ...newState });
  };
  const handleCloseToast = () => {
    setOpenToast({ ...openToast, isOpen: false });
  };
  useEffect(() => {
    getAllOvertimes().then((res) => {
      setOvertime(res);
      setIsLoaded(true);
    });
  }, [overtime]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangeIsActive = (event) => {
    formik.setFieldValue('IsActive', event.target.value);
  };
  const handleChangeDepartment = (event) => {
    formik.setFieldValue('DepartmentID', event.target.value);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredOvertimes.map((n) => n.Overtime.OverTimeID);
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
  const convertIsActive = (isactive) => {
    if (isactive === true) {
      return 'Active';
    }
    return 'Not Active';
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
      OvertimeName: '',
      DepartmentID: '',
      IsActive: '',
      Quantity: '',
      CreatedBy: emailLoginUser,
      OverTimeDate: date,
      StartTime: convertTime(timeStart),
      EndTime: convertTime(timeEnd)
    },
    onSubmit: () => {
      setLoading(true);
      axios
        .post(`Organization/OverTime`, {
          OvertimeName: formik.values.OvertimeName,
          DepartmentID: formik.values.DepartmentID,
          IsActive: formik.values.IsActive,
          Quantity: formik.values.Quantity,
          OverTimeDate: date,
          StartTime: convertTime(timeStart),
          CreatedBy: emailLoginUser,
          EndTime: convertTime(timeEnd)
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

  const handleDelete = (data) => {
    if (confirm(`Are you sure you want to delete ${selected.length} overtimes?`)) {
      const list = selected.map((item) => {
        if (item.headline === data.headline) {
          axios.delete(`Organization/OverTime/${item}`).then((res) => {
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - overtime.length) : 0;

  const filteredOvertimes = applySortFilter(overtime, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredOvertimes.length === 0;
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Overtime | ChamCongVN">
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
                  Add Overtime
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Overtime Name"
                    {...getFieldProps('OvertimeName')}
                    variant="outlined"
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                      labelId="select-label"
                      label="Employee"
                      {...getFieldProps('DepartmentID')}
                      variant="outlined"
                      onChange={handleChangeDepartment}
                    >
                      {department.map((item) => (
                        <MenuItem key={item.DepartmentID} value={item.DepartmentID}>
                          {item.DepartmentName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="OverTime Date"
                      views={['day', 'month', 'year']}
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Time Start"
                      views={['hours', 'minutes', 'seconds']}
                      inputFormat="HH:mm:ss"
                      value={timeStart}
                      onChange={(newValue) => {
                        setTimeStart(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Time End"
                      value={timeEnd}
                      views={['hours', 'minutes', 'seconds']}
                      inputFormat="HH:mm:ss"
                      onChange={(newValue) => {
                        setTimeEnd(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">IsActive</InputLabel>
                    <Select
                      labelId="select-label"
                      label="Employee"
                      {...getFieldProps('IsActive')}
                      variant="outlined"
                      onChange={handleChangeIsActive}
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>No Active</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Quantity"
                    {...getFieldProps('Quantity')}
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
                  Add Overtime
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Overtime
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Overtime
          </Button>
        </Stack>

        <Card>
          <OvertimeListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OvertimeListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredOvertimes.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredOvertimes
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { Department } = row;
                      const {
                        OverTimeID,
                        OverTimeDate,
                        OverTimeName,
                        StartTime,
                        EndTime,
                        Quantity,
                        IsActive
                      } = row.Overtime;
                      const isItemSelected = selected.indexOf(OverTimeID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={OverTimeID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, OverTimeID)}
                            />
                          </TableCell>
                          <TableCell align="left">{OverTimeID}</TableCell>
                          <TableCell align="left">{OverTimeName}</TableCell>
                          <TableCell align="left">{Department}</TableCell>
                          <TableCell align="left">{StartTime}</TableCell>
                          <TableCell align="left">{EndTime}</TableCell>
                          <TableCell align="left">{convertDate(OverTimeDate)}</TableCell>
                          <TableCell align="left">{Quantity}</TableCell>
                          <TableCell align="left">{convertIsActive(IsActive)}</TableCell>
                          <TableCell align="right">
                            <OvertimeMoreMenu
                              dulieu={row}
                              handleOpenToast={handleOpenToast}
                              emailLoginUser={emailLoginUser}
                            />
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
            count={filteredOvertimes.length}
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
