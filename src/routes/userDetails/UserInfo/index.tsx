import { Avatar, Box, Container, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { FC } from 'react';
import { UserDetails } from 'types';

type Props = {
  user: UserDetails;
};

const UserInfo: FC<Props> = ({ user }) => (
  <Container>
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Avatar
        sx={{ bgcolor: deepPurple[500], height: '8rem', width: '8rem', fontSize: '3rem' }}
        alt={user.displayName}
        // src={user.photoURL} this will be used
      >
        {(user.displayName || 'Unknown').slice(0, 1).toUpperCase()}
      </Avatar>
      <Typography variant="h3">{user.displayName || 'Unknown'}</Typography>
    </Box>
  </Container>
);

export default UserInfo;
