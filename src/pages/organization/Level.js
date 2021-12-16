/* eslint-disable jsx-a11y/label-has-associated-control */
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
  MenuItem,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Box
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import axios from '../../functions/Axios';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { LevelListHead, LevelListToolbar, LevelMoreMenu } from '../../components/_dashboard/level';
import { getAllLevels, getAllPosition } from '../../functions/Organization';
import Toast from '../../components/Toast';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'LevelID', label: 'LevelID', alignRight: false },
  { id: 'PositionName', label: 'Position Name', alignRight: false },
  { id: 'LevelName', label: 'Level Name', alignRight: false },
  { id: 'Coefficient', label: 'Coefficient', alignRight: false },
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

export default function Level() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [level, setLevel] = useState([]);
  const [position, setPosition] = useState([]);
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
    getAllLevels().then((res) => {
      setLevel(res);
    });
    getAllPosition().then((res) => {
      setPosition(res);
    });
  }, [level]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = level.map((n) => n.name);
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
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };
  const formik = useFormik({
    initialValues: {
      PositionID: '',
      LevelName: '',
      Coefficient: '',
      remember: true
    },
    onSubmit: () => {
      axios
        .post(`Organization/AddOrEditlevel`, formik.values)
        .then((res) => {
          if (res.data.Status === 'Success') {
            setOpen(false);
            handleOpenToast({
              isOpen: true,
              horizontal: 'right',
              vertical: 'top',
              message: 'Successfully Added',
              color: 'success'
            })();
            formik.resetForm();
          } else {
            handleOpenToast({
              isOpen: true,
              horizontal: 'right',
              vertical: 'top',
              message: 'Fail deleted',
              color: 'error'
            })();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const handleChangePostion = (event) => {
    formik.setFieldValue('PositionID', event.target.value);
  };
  const { handleSubmit, getFieldProps } = formik;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - level.length) : 0;

  const filteredUsers = applySortFilter(level, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Level | ChamCongVN">
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
                  Add Level
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Position</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...getFieldProps('PositionID')}
                    label="Position"
                    onChange={handleChangePostion}
                  >
                    {position.map((item) => (
                      <MenuItem key={item.PositionID} value={item.PositionID}>
                        {item.PositionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Level Name"
                    {...getFieldProps('LevelName')}
                    variant="outlined"
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Coefficient"
                    {...getFieldProps('Coefficient')}
                    variant="outlined"
                  />
                </Stack>
                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                  Add Level
                </LoadingButton>
              </Stack>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Level
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Level
          </Button>
        </Stack>

        <Card>
          <LevelListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <LevelListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={level.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {level.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { LevelID, LevelName, Coefficient } = row.Level;
                    const { PositionName } = row;
                    const isItemSelected = selected.indexOf(LevelName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={LevelID}
                        tabIndex={-1}
                        level="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, LevelName)}
                          />
                        </TableCell>
                        <TableCell align="left">{LevelID}</TableCell>
                        <TableCell align="left">{PositionName}</TableCell>
                        <TableCell align="left">{LevelName}</TableCell>
                        <TableCell align="left">{Coefficient}</TableCell>
                        <TableCell align="right">
                          <LevelMoreMenu dulieu={row} handleOpenToast={handleOpenToast} />
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
            count={level.length}
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
