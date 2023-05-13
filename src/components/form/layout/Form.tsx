import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const Form: FC<Props> = ({ children, ...props }) => (
  <form {...props}>
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      {children}
    </Box>
  </form>
);

export default Form;
