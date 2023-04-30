import { LoadingButton } from '@mui/lab';

const LoadMoreButton = ({ loading, handleClick }) => (
  <LoadingButton
    sx={{ width: '100%', height: 64 }}
    size="large"
    loading={loading}
    onClick={handleClick}
  >
    Load More
  </LoadingButton>
);

export default LoadMoreButton;
