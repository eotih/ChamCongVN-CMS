import * as React from 'react';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { SalaryListHead, SalaryListToolbar } from '../../components/_dashboard/salary';
import { getAllSalaries, getAllTotalSalary } from '../../functions/Salary';
import { ExportExcel } from '../exportExcel';
import UploadFile from '../uploadSalaryFile';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'TotalSalaryID', label: 'ID', alignRight: false },
  { id: 'FullName', label: 'FullName', alignRight: false },
  { id: 'Month', label: 'Month', alignRight: false },
  { id: 'Year', label: 'Year', alignRight: false },
  { id: 'TotalTime', label: 'Total Time', alignRight: false },
  { id: 'Salary', label: 'Salary', alignRight: false },
  { id: 'TotalAdvance', label: 'Total Advance', alignRight: false },
  { id: 'TotalDeduction', label: 'Total Deduction', alignRight: false },
  { id: 'TotalLaudatory', label: 'Total Laudatory', alignRight: false },
  { id: 'TotalOvertime', label: 'Total Overtime', alignRight: false },
  { id: 'TotalOvertimeSalary', label: 'Total Overtime Salary', alignRight: false },
  { id: 'TotalSalary', label: 'Total Salary', alignRight: false },
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
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [salary, setSalary] = useState([]);
  const [totalSalary, setTotalSalary] = useState([]);

  useEffect(() => {
    getAllSalaries().then((res) => {
      setSalary(res);
    });
    getAllTotalSalary().then((res) => {
      setTotalSalary(res);
    });
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = salary.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - salary.length) : 0;

  const filteredSalarys = applySortFilter(salary, getComparator(order, orderBy), filterName);

  const isSalaryNotFound = filteredSalarys.length === 0;

  return (
    <Page title="Salary | ChamCongVN">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Salary
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="right" justifyContent="space-between" mb={5}>
          <ExportExcel apiData={totalSalary} fileName="Bảng lương công ty" />
          <UploadFile />
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
                  rowCount={salary.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {salary.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      TotalSalaryID,
                      FullName,
                      Month,
                      Year,
                      TotalTime,
                      Salary,
                      TotalAdvance,
                      TotalDeduction,
                      TotalLaudatory,
                      TotalOvertime,
                      TotalOvertimeSalary,
                      TotalSalary
                    } = row.TotalSalary;
                    const { Image } = row;
                    const isItemSelected = selected.indexOf(FullName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={TotalSalaryID}
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
                        <TableCell align="left">{TotalSalaryID}</TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={FullName} src={Image} />
                            <Typography variant="subtitle2" noWrap>
                              {FullName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{Month}</TableCell>
                        <TableCell align="left">{Year}</TableCell>
                        <TableCell align="left">{TotalTime}</TableCell>
                        <TableCell align="left">{Salary}</TableCell>
                        <TableCell align="left">{TotalAdvance}</TableCell>
                        <TableCell align="left">{TotalDeduction}</TableCell>
                        <TableCell align="left">{TotalLaudatory}</TableCell>
                        <TableCell align="left">{TotalOvertime}</TableCell>
                        <TableCell align="left">{TotalOvertimeSalary}</TableCell>
                        <TableCell align="left">{TotalSalary}</TableCell>
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
            count={salary.length}
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
