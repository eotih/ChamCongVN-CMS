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
  AdvanceListHead,
  AdvanceListToolbar,
  AdvanceMoreMenu
} from '../../components/_dashboard/advance';
import { getAllAdvances } from '../../functions/Salary';
import { getAllEmployees } from '../../functions/Employee';
import { convertDate } from '../../utils/formatDatetime';
import Toast from '../../components/Toast';
import { accountContext } from '../../context/Hooks';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'AdvanceID', label: 'AdvanceID', alignRight: false },
  { id: 'Employee', label: 'Employee', alignRight: false },
  { id: 'Reason', label: 'Reason', alignRight: false },
  { id: 'AdvanceDate', label: 'Advance Date', alignRight: false },
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
    return filter(
      array,
      (_user) => _user.FullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Advance() {
  const [page, setPage] = useState(0);
  const [date, setDate] = React.useState(new Date());
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [advance, setAdvance] = useState([]);
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
    getAllAdvances().then((res) => {
      setAdvance(res);
      setIsLoaded(true);
    });
  }, [advance]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredadvances.map((n) => n.Advance.AdvanceID);
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
  const account = accountContext();
  const emailLoginUser = account.Account.Email;
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
      Reason: '',
      AdvanceDate: date,
      Amount: '',
      Signer: emailLoginUser,
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Salary/Advances`, {
          EmployeeID: formik.values.EmployeeID,
          Reason: formik.values.Reason,
          Amount: formik.values.Amount,
          Signer: emailLoginUser,
          AdvanceDate: date
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
    if (confirm(`Are you sure you want to delete ${selected.length} advance?`)) {
      const list = selected.map((item) => {
        if (item.headline === data.headline) {
          axios.delete(`salary/Advance/${item}`).then((res) => {
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

  const handleChange = (event) => {
    formik.setFieldValue('EmployeeID', event.target.value);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - advance.length) : 0;

  const filteredadvances = applySortFilter(advance, getComparator(order, orderBy), filterName);

  const isadvanceNotFound = filteredadvances.length === 0;
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Advance | ChamCongVN">
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
                    Add Advance
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                        label="Advance Date"
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
                      label="Amount"
                      {...getFieldProps('Amount')}
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
                    Add Advance
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </FormikProvider>
        </Modal>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Advance
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Advance
          </Button>
        </Stack>

        <Card>
          <AdvanceListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <AdvanceListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredadvances.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredadvances
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { AdvanceID, Signer, AdvanceDate, Reason, Amount } = row.Advance;
                      const { FullName, Image } = row;
                      const isItemSelected = selected.indexOf(AdvanceID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={AdvanceID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, AdvanceID)}
                            />
                          </TableCell>
                          <TableCell align="left">{AdvanceID}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={FullName} src={Image} />
                              <Typography variant="subtitle2" noWrap>
                                {FullName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{Reason}</TableCell>
                          <TableCell align="left">{convertDate(AdvanceDate)}</TableCell>
                          <TableCell align="left">{Amount}</TableCell>
                          <TableCell align="left">{Signer}</TableCell>
                          <TableCell align="right">
                            <AdvanceMoreMenu
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
                {isadvanceNotFound && (
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
            count={filteredadvances.length}
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
