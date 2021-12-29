/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { filter } from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';
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
  TablePagination,
  Box
} from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  AsbentListHead,
  AsbentListToolbar,
  AsbentMoreMenu
} from '../../components/_dashboard/asbentapplication';
import { getAllAbsentApplication } from '../../functions/Application';
import { convertDate } from '../../utils/formatDatetime';
import Toast from '../../components/Toast';
import axios from '../../functions/Axios';
import { accountContext } from '../../context/Hooks';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'AbsentApplicationID', label: 'AbsentApplicationID', alignRight: false },
  { id: 'Employee', label: 'Employee', alignRight: false },
  { id: 'AbsentType', label: 'AbsentType', alignRight: false },
  { id: 'AbsentDateBegin', label: 'Absent Date Begin', alignRight: false },
  { id: 'NumberOfDays', label: 'Number Of Days', alignRight: false },
  { id: 'Reason', label: 'Reason', alignRight: false },
  { id: 'StateName', label: 'State', alignRight: false },
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

export default function Asbent() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [asbent, setAsbent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
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
    getAllAbsentApplication().then((res) => {
      setAsbent(res);
      setIsLoaded(true);
    });
  }, [asbent]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredasbents.map((n) => n.AbsentApplications.AbsentApplicationID);
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
  const handleDelete = (data) => {
    if (confirm(`Are you sure you want to delete ${selected.length} absent application?`)) {
      const list = selected.map((item) => {
        if (item.headline === data.headline) {
          axios.delete(`Application/AbsentApplication/${item}`).then((res) => {
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const account = accountContext();
  const emailLoginUser = account.Account.Email;
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - asbent.length) : 0;

  const filteredasbents = applySortFilter(asbent, getComparator(order, orderBy), filterName);

  const isasbentNotFound = filteredasbents.length === 0;
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Asbent Application | ChamCongVN">
      {openToast.isOpen === true && <Toast open={openToast} handleCloseToast={handleCloseToast} />}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Asbent Application
          </Typography>
        </Stack>

        <Card>
          <AsbentListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDelete}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <AsbentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredasbents.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredasbents
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        AbsentApplicationID,
                        AbsentType,
                        AbsentDateBegin,
                        NumberOfDays,
                        Reason
                      } = row.AbsentApplications;
                      const { StateName, FullName, Image } = row;
                      const isItemSelected = selected.indexOf(AbsentApplicationID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={AbsentApplicationID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, AbsentApplicationID)}
                            />
                          </TableCell>
                          <TableCell align="left">{AbsentApplicationID}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={FullName} src={Image} />
                              <Typography variant="subtitle2" noWrap>
                                {FullName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{AbsentType}</TableCell>
                          <TableCell align="left">{convertDate(AbsentDateBegin)}</TableCell>
                          <TableCell align="left">{NumberOfDays}</TableCell>
                          <TableCell align="left">{Reason}</TableCell>
                          <TableCell align="left">{StateName}</TableCell>
                          <TableCell align="right">
                            <AsbentMoreMenu
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
                {isasbentNotFound && (
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
            count={filteredasbents.length}
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
