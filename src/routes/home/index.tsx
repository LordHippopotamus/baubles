import { limit, orderBy } from 'firebase/firestore';
import { getDocs } from 'lib/firebase';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { Container, Grid, Skeleton } from '@mui/material';
import { Bauble } from 'types';
import { useInfiniteQuery } from 'hooks/infiniteQuery';
import Card from './Card';
import { LoadingButton } from '@mui/lab';
import NoMoreResultsAlert from 'components/NoMoreResultsAlert';

export const loader: LoaderFunction = async () =>
  await getDocs<Bauble[]>(['baubles'], [orderBy('createdAt', 'desc'), limit(10)]);

const Home = () => {
  const loaderData = useLoaderData() as Bauble[];
  const {
    loading,
    hasMore,
    data: baubles,
    fetchData,
  } = useInfiniteQuery<Bauble>(
    { path: ['baubles'], options: [orderBy('createdAt', 'desc'), limit(10)] },
    loaderData
  );

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
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
      {hasMore ? (
        <LoadingButton
          sx={{ width: '100%', height: 64 }}
          size="large"
          loading={loading}
          onClick={fetchData}
        >
          Load More
        </LoadingButton>
      ) : (
        <NoMoreResultsAlert />
      )}
    </Container>
  );
};

export default Home;
