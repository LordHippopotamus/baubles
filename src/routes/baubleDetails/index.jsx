import { useLoaderData } from 'react-router-dom';
import { Box, Container, Divider } from '@mui/material';
import { getDoc } from 'lib/firebase';
import BaubleInfo from './BaubleInfo';
import Preview from './Preview';

export const loader = async ({ params }) => {
  const bauble = await getDoc(['baubles', params.baubleId]);
  const owner = await getDoc(['users', bauble.owner]);
  return { bauble, owner };
};

const BaubleDetails = () => {
  const { bauble, owner } = useLoaderData();

  return (
    <Box
      height={{ xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }}
      display="flex"
      flexDirection="column"
    >
      <Box>
        <Container sx={{ my: 4 }}>
          <BaubleInfo
            name={bauble.name}
            ownerName={owner.displayName}
            createdAt={bauble.createdAt}
          />
        </Container>
        <Divider />
      </Box>
      <Preview area={bauble.area} />
    </Box>
  );
};

export default BaubleDetails;
