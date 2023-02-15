import { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, Skeleton, TextField, Typography } from '@mui/material';
import { useUserStore } from 'hooks';

const DisplayName = () => {
  const user = useUserStore(state => state.user);
  const changeDisplayName = useUserStore(state => state.changeDisplayName);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState();

  const handleEdit = () => {
    setEditing(true);
    setDisplayName(user.displayName || 'Unknown');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    await changeDisplayName(displayName);
    setLoading(false);
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <TextField
            value={displayName}
            onChange={event => setDisplayName(event.target.value)}
            variant="standard"
          />
          <LoadingButton loading={loading} type="submit" color="primary" sx={{ ml: 1 }}>
            Save
          </LoadingButton>
        </form>
      ) : (
        <Box display="flex" alignItems="flex-end">
          <Typography variant="h3">
            {user === undefined ? <Skeleton width="8rem" /> : user.displayName || 'Unknown'}
          </Typography>
          <IconButton
            disabled={user === undefined}
            onClick={handleEdit}
            color="primary"
            sx={{ ml: 1 }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default DisplayName;
