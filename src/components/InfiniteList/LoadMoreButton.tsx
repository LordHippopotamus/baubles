import { LoadingButton } from '@mui/lab';
import { FC } from 'react';

type Props = {
  loading: boolean;
  onClick: () => void;
};

const LoadMoreButton: FC<Props> = ({ loading, onClick }) => (
  <LoadingButton
    sx={{ width: '100%', height: 64 }}
    size="large"
    loading={loading}
    onClick={onClick}
  >
    Load More
  </LoadingButton>
);

export default LoadMoreButton;
