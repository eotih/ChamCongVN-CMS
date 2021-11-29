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
import { SalaryListHead, SalaryListToolbar } from '../../components/_dashboard/salary';
import { getAllSalarys } from '../../functions/Salary';
import { getAllEmployees } from '../../functions/Employee';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'CoefficientSalary', label: 'Co-efficient Salary', alignRight: false },
  { id: 'TotalWorkTime', label: 'Total Work Time', alignRight: false },
  { id: 'TotalAbsentApplications', label: 'Total Absent Applications', alignRight: false },
  { id: 'TotalAdvances', label: 'Total Advances', alignRight: false },
  { id: 'TotalOvertimeSalary', label: 'Total Overtime Salary', alignRight: false },
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
  const [laudate, setLauDate] = React.useState(new Date());
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [Salary, setSalary] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllSalarys().then((res) => {
      setSalary(res);
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
      const newSelecteds = Salary.map((n) => n.name);
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
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formik = useFormik({
    initialValues: {
      EmployeeID: '',
      SalaryName: '',
      SalaryDate: laudate,
      Reason: '',
      Amount: '',
      CreatedBy: '',
      remember: true
    },
    onSubmit: () => {
      console.log(formik.values);
      axios
        .post(``, {
          EmployeeID: formik.values.EmployeeID,
          SalaryName: formik.values.SalaryName,
          Reason: formik.values.Reason,
          Amount: formik.values.Amount,
          CreatedBy: formik.values.CreatedBy,
          SalaryDate: laudate
        })
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Salary.length) : 0;

  const filteredSalarys = applySortFilter(Salary, getComparator(order, orderBy), filterName);

  const isSalaryNotFound = filteredSalarys.length === 0;

  return (
    <Page title="Salary | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Salary
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Export Excel
          </Button>
        </Stack>

        <Card>
          <SalaryListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SalaryListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={Salary.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {Salary.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { SalaryEmployeeID, SalaryName, SalaryDate, Reason, Amount } =
                      row.SalaryEmployee;
                    const { FullName, Image } = row;
                    const isItemSelected = selected.indexOf(FullName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={SalaryEmployeeID}
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
                        <TableCell align="left">{SalaryEmployeeID}</TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={FullName} src={Image} />
                            <Typography variant="subtitle2" noWrap>
                              {FullName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{SalaryName}</TableCell>
                        <TableCell align="left">{convertDateTime(SalaryDate)}</TableCell>
                        <TableCell align="left">{Reason}</TableCell>
                        <TableCell align="left">{Amount}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isSalaryNotFound && (
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
            count={Salary.length}
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
