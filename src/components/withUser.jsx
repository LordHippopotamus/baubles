import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useUserStore } from 'hooks';
import { Navigate, useNavigate } from 'react-router-dom';

/* eslint-disable react/display-name */
const withUser =
  (
    Component,
    {
      requireAuthorization = false,
      shouldWaitAuthorization = false,
      shouldCheckPermissions = false,
      useOwnerId = () => null,
    }
  ) =>
  () => {
    const navigate = useNavigate();

    const user = useUserStore(state => state.user);
    const ownerId = useOwnerId();

    if (shouldWaitAuthorization && user === undefined)
      return (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      );
    if (requireAuthorization && user === null) return <Navigate to="/login" />;
    if (shouldCheckPermissions && user.uid !== ownerId)
      return (
        <Dialog open={true}>
          <DialogTitle>Unauthorized Access</DialogTitle>
          <DialogContent>You don&apos;t have permissions to change this bauble</DialogContent>
          <DialogActions>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </DialogActions>
        </Dialog>
      );

    return <Component user={user} />;
  };

export default withUser;
