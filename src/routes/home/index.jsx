import { limit, orderBy } from 'firebase/firestore';
import { getDocs } from 'lib/firebase';
import { useLoaderData } from 'react-router-dom';
import InfiniteList from 'components/InfiniteList';
import { Container } from '@mui/material';

export const loader = async () =>
  await getDocs(['baubles'], [orderBy('createdAt', 'desc'), limit(10)]);

const Home = () => {
  const loaderData = useLoaderData();

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
