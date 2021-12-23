/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
// material
import {
  Card,
  Table,
  Stack,
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
import UploadFile from '../uploadRecuirtmentFile';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  RecruitmentListHead,
  RecruitmentListToolbar,
  RecruitmentMoreMenu
} from '../../components/_dashboard/recruitment';
import { getAllRecruitments } from '../../functions/Employee';
import { convertDate } from '../../utils/formatDatetime';
import Toast from '../../components/Toast';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'RecruitmentID', label: 'RecruitmentID', alignRight: false },
  { id: 'Fullname', label: 'Fullname', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'Gender', label: 'Gender', alignRight: false },
  { id: 'DateOfBirth', label: 'DOB', alignRight: false },
  { id: 'Address', label: 'Address', alignRight: false },
  { id: 'TemporaryAddress', label: 'Temporary Address', alignRight: false },
  { id: 'Phone', label: 'Phone', alignRight: false },
  { id: 'ApplyFor', label: 'Apply For', alignRight: false },
  { id: 'LinkCV', label: 'Link CV', alignRight: false },
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

export default function Recruitment() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [recruitment, setRecruitment] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
    getAllRecruitments().then((res) => {
      setRecruitment(res);
      setIsLoaded(true);
    });
  }, [recruitment]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = recruitment.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - recruitment.length) : 0;

  const filteredUsers = applySortFilter(recruitment, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Recruitment | ChamCongVN">
      {openToast.isOpen === true && <Toast open={openToast} handleCloseToast={handleCloseToast} />}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Recruitment
          </Typography>
          <UploadFile />
        </Stack>

        <Card>
          <RecruitmentListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RecruitmentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={recruitment.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {recruitment
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        RecruitmentID,
                        FullName,
                        Gender,
                        DateOfBirth,
                        Address,
                        TemporaryAddress,
                        Phone,
                        Email,
                        ApplyFor,
                        LinkCV
                      } = row;
                      const isItemSelected = selected.indexOf(FullName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={RecruitmentID}
                          tabIndex={-1}
                          recruitment="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, FullName)}
                            />
                          </TableCell>
                          <TableCell align="left">{RecruitmentID}</TableCell>
                          <TableCell align="left">{FullName}</TableCell>
                          <TableCell align="left">{Email}</TableCell>
                          <TableCell align="left">{Gender}</TableCell>
                          <TableCell align="left">{convertDate(DateOfBirth)}</TableCell>
                          <TableCell align="left">{Address}</TableCell>
                          <TableCell align="left">{TemporaryAddress}</TableCell>
                          <TableCell align="left">{Phone}</TableCell>
                          <TableCell align="left">{ApplyFor}</TableCell>
                          <TableCell align="left">{LinkCV}</TableCell>
                          <TableCell align="right">
                            <RecruitmentMoreMenu dulieu={row} handleOpenToast={handleOpenToast} />
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
            count={recruitment.length}
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
