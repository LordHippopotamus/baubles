import { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useUser } from 'hooks/user';
import EditDisplayName from './EditDisplayName';

const DisplayName = () => {
  const user = useUser();

  const [editing, setEditing] = useState(false);

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleCancelEditing = () => setEditing(false);

  if (editing) {
    return <EditDisplayName handleCancelEditing={handleCancelEditing} />;
  }

  return (
    <Box display="flex" alignItems="flex-end">
      <Typography variant="h3">{user.displayName}</Typography>
      <IconButton
        disabled={user === undefined}
        onClick={handleStartEditing}
        color="primary"
        sx={{ ml: 1 }}
      >
        <Edit fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default DisplayName;
