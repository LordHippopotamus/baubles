import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useFetcher } from 'react-router-dom';
import { useUser } from 'hooks/user';
import { useEffect, useState } from 'react';
import { routes } from 'utils/routes';

const EditDisplayName = ({ handleCancelEditing }) => {
  const user = useUser();
  const fetcher = useFetcher();
  const [displayName, setDisplayName] = useState(user.displayName);

  const handleChange = event => setDisplayName(event.target.value);
  const handleSubmit = async event => {
    event.preventDefault();

    if (displayName === user.displayName) return;

    fetcher.submit(
      { profile: JSON.stringify({ displayName }) },
      { method: 'patch', action: routes.home }
    );
  };

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      handleCancelEditing(false);
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <ClickAwayListener onClickAway={handleCancelEditing}>
      <form onSubmit={handleSubmit}>
        <TextField value={displayName} onChange={handleChange} variant="standard" />
        <Button
          onClick={handleCancelEditing}
          disabled={fetcher.state !== 'idle'}
          color="primary"
          sx={{ ml: 1 }}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={fetcher.state !== 'idle'}
          disabled={displayName === user.displayName}
          type="submit"
          color="primary"
          sx={{ ml: 1 }}
        >
          Save
        </LoadingButton>
      </form>
    </ClickAwayListener>
  );
};

export default EditDisplayName;
