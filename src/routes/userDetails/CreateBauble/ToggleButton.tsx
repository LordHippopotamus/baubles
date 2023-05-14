import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FC } from 'react';

type Props = {
  onClick: () => void;
};

const ToggleButton: FC<Props> = ({ onClick }) => (
  <Button variant="outlined" sx={{ width: 1, height: '8rem' }} onClick={onClick}>
    <Add />
  </Button>
);

export default ToggleButton;
