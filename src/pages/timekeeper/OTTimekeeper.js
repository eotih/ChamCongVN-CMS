/* eslint-disable import/no-unresolved */
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// components
import Page from '../../components/Page';
import {
  TimeKeeperSort,
  TimeKeeperList,
  TimeKeeperWidget,
  TimeKeeperFilterSidebar
} from '../../components/_dashboard/ottimekeeper';
//
import { GetAllTimeKeeping } from '../../functions/TimeKeeper';

// ----------------------------------------------------------------------

export default function TimeKeeper() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [timeKeeper, setTimeKeeper] = useState([]);
  useEffect(() => {
    GetAllTimeKeeping().then((res) => {
      setTimeKeeper(res);
      setIsLoaded(true);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Page title="Dashboard: TimeKeeper | ChamCongVN">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          TimeKeeper
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <TimeKeeperFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <TimeKeeperSort />
          </Stack>
        </Stack>

        <TimeKeeperList time={timeKeeper} />
        <TimeKeeperWidget />
      </Container>
    </Page>
  );
}
