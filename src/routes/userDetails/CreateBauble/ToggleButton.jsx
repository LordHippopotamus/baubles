import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

const ToggleButton = props => (
  <Button variant="outlined" sx={{ width: 1, height: '8rem' }} {...props}>
    <Add />
  </Button>
);

export default ToggleButton;
