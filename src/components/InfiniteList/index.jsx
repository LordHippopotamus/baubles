import { Box, Grid, Skeleton } from '@mui/material';
import Card from './Card';
import LoadMoreButton from './LoadMoreButton';
import NoMoreResultsAlert from './NoMoreResultsAlert';
import { useInfiniteQuery } from './infiniteQuery';

const InfiniteList = ({ path, options, initialData }) => {
  const {
    loading,
    hasMore,
    data: baubles,
    fetchData,
  } = useInfiniteQuery({ path, options }, initialData);

  return (
    <>
      <Grid container spacing={2}>
        {baubles.map(bauble => (
          <Grid item xs={12} md={6} key={bauble.id}>
            <Card bauble={bauble} />
          </Grid>
        ))}
        {loading &&
          [...Array(10).keys()].map(el => (
            <Grid item xs={12} md={6} key={el}>
              <Skeleton variant="rounded" height={64} />
            </Grid>
          ))}
      </Grid>

      <Box mt={2}>
        {hasMore ? (
          <LoadMoreButton loading={loading} handleClick={fetchData} />
        ) : (
          <NoMoreResultsAlert />
        )}
      </Box>
    </>
  );
};

export default InfiniteList;
