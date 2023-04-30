import { Typography } from '@mui/material';

const BaubleInfo = ({ name, ownerName, createdAt }) => (
  <>
    <Typography variant="h5">{name}</Typography>
    <Typography>
      Created by {ownerName} at {createdAt.toDate().toDateString()}
    </Typography>
  </>
);

export default BaubleInfo;
