import { Box } from '@mui/material';

const Form = ({ children, ...props }) => (
  <form {...props}>
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      {children}
    </Box>
  </form>
);

export default Form;
