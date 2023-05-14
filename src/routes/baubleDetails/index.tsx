import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { Box, Container, Divider } from '@mui/material';
import { getDoc } from 'lib/firebase';
import BaubleInfo from './BaubleInfo';
import Preview from 'components/Preview';
import { Bauble, UserDetails } from 'types';
import { FC } from 'react';

export const loader: LoaderFunction = async ({ params }) => {
  const bauble = await getDoc<Bauble>(['baubles', params.baubleId as string]);
  const owner = await getDoc<UserDetails>(['users', bauble.owner]);
  return { bauble, owner };
};

const BaubleDetails: FC = () => {
  const { bauble, owner } = useLoaderData() as { bauble: Bauble; owner: UserDetails };

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
