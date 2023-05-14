import { LoadingButton } from '@mui/lab';
import { FC, ReactNode } from 'react';

type Props = {
  error: boolean;
  loading: boolean;
  children: ReactNode;
};

const SubmitButton: FC<Props> = ({ error, loading, children }) => (
  <LoadingButton type="submit" disabled={error} loading={loading} size="large" variant="contained">
    {children}
  </LoadingButton>
);

export default SubmitButton;
