import * as React from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
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
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { LoadingButton } from '@mui/lab';
import axios from '../../functions/Axios';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  OvertimeListHead,
  OvertimeListToolbar,
  OvertimeMoreMenu
} from '../../components/_dashboard/overtime';
import { getAllOvertimes } from '../../functions/Salary';
import { getAllEmployees } from '../../functions/Employee';
//
import Overtime from '../../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'OvertimeEmployeeID', label: 'OvertimeEmployeeID', alignRight: false },
  { id: 'Employee', label: 'Employee', alignRight: false },
  { id: 'OvertimeName', label: 'Overtime Name', alignRight: false },
  { id: 'OvertimeDate', label: 'Overtime Date', alignRight: false },
  { id: 'Reason', label: 'Reason', alignRight: false },
  { id: 'Amount', label: 'Amount', alignRight: false },
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

export default function User() {
  const [page, setPage] = useState(0);
  const [EmployeeName, setEmployeeName] = React.useState('');
  const [value, setValue] = React.useState(new Date());
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [Overtime, setOvertime] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllOvertimes().then((res) => {
      setOvertime(res);
    });
    getAllEmployees().then((res) => {
      setEmployee(res);
    });
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Overtime.map((n) => n.name);
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
  const convertDateTime = (date) => {
    const newDate = new Date(date);
    const hour = newDate.getHours();
    const min = newDate.getMinutes();
    const sec = newDate.getSeconds();
    return `${hour}:${min}:${sec}`;
  };
  const style = {
    position: 'relative',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      EmployeeID: '',
      OvertimeName: '',
      Reason: '',
      Amount: '',
      CreatedBy: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Salary/AddOrEditOvertimeEmployee`, formik.values)
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

  const handleChange = (event) => {
    formik.setFieldValue('EmployeeID', event.target.value);
    setEmployees(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Overtime.length) : 0;

  const filteredOvertimes = applySortFilter(Overtime, getComparator(order, orderBy), filterName);

  const isOvertimeNotFound = filteredOvertimes.length === 0;

  return (
    <Page title="Overtime | Minimal-UI">
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
                    Add Overtime
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Overtime Name"
                      {...getFieldProps('OvertimeName')}
                      variant="outlined"
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
                      <Select
                        labelId="select-label"
                        label="Employee"
                        value={employees}
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
                      <TimePicker
                        value={value}
                        onChange={setValue}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <TextField
                      fullWidth
                      label="Overtime type"
                      {...getFieldProps('OvertimeType')}
                      variant="outlined"
                    />
                  </Stack>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Add Overtime
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal>
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
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OvertimeListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={Overtime.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {Overtime.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                    (row) => {
                      const { OvertimeEmployeeID, OvertimeName, OvertimeDate, Reason, Amount } =
                        row.OvertimeEmployee;
                      const { FullName, Image } = row.Employee;
                      const isItemSelected = selected.indexOf(FullName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={OvertimeEmployeeID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, FullName)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={FullName} src={Image} />
                              <Typography variant="subtitle2" noWrap>
                                {FullName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{OvertimeName}</TableCell>
                          <TableCell align="left">{OvertimeDate}</TableCell>
                          <TableCell align="left">{Reason}</TableCell>
                          <TableCell align="left">{Amount}</TableCell>
                          <TableCell align="right">
                            <OvertimeMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isOvertimeNotFound && (
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
            count={Overtime.length}
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
