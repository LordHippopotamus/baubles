import { Typography } from '@mui/material';
import { FC } from 'react';
import { Bauble, UserDetails } from 'types';

type Props = {
  name: Bauble['name'];
  ownerName: UserDetails['displayName'];
  createdAt: Bauble['createdAt'];
};

const BaubleInfo: FC<Props> = ({ name, ownerName, createdAt }) => (
  <>
    <Typography variant="h5">{name}</Typography>
    <Typography>
      Created by {ownerName} at {createdAt.toDate().toDateString()}
    </Typography>
  </>
);

export default BaubleInfo;
