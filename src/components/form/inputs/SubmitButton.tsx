import { LoadingButton } from '@mui/lab';

const SubmitButton = ({ error, loading, children }) => (
  <LoadingButton type="submit" disabled={error} loading={loading} size="large" variant="contained">
    {children}
  </LoadingButton>
);

export default SubmitButton;
