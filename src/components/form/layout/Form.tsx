import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onSubmit: () => void;
};
const Form: FC<Props> = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      {children}
    </Box>
  </form>
);

export default Form;
