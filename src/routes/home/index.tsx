import { limit, orderBy } from 'firebase/firestore';
import { getDocs } from 'lib/firebase';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import InfiniteList from 'components/InfiniteList';
import { Container } from '@mui/material';
import { Bauble } from 'types';

export const loader: LoaderFunction = async () =>
  await getDocs<Bauble[]>(['baubles'], [orderBy('createdAt', 'desc'), limit(10)]);

const Home = () => {
  const loaderData = useLoaderData() as Bauble[];

  return (
    <Container sx={{ my: 4 }}>
      <InfiniteList
        path={['baubles']}
        options={[orderBy('createdAt', 'desc'), limit(10)]}
        initialData={loaderData}
      />
    </Container>
  );
};

export default Home;
