import { LoadingButton } from '@mui/lab';

const SubmitButton = ({ errors, loading, children }) => (
  <LoadingButton
    color={Object.keys(errors).length ? 'error' : 'primary'}
    loading={loading}
    variant="contained"
    type="submit"
    size="large"
    sx={{ mt: 2 }}
  >
    {children}
  </LoadingButton>
);

export default SubmitButton;
