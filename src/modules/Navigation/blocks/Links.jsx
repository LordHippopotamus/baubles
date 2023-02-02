import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Links = ({ pages = [{ name: 'Home', path: '/' }] }) => (
  <Box ml={2} display="flex" gap={1}>
    {pages.map(el => (
      <Button component={Link} to={el.path} color="inherit" key={el.path}>
        {el.name}
      </Button>
    ))}
  </Box>
);

export default Links;
