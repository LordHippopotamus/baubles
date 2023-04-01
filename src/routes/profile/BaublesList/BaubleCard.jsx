import { Delete, Edit } from '@mui/icons-material';
import { Box, Card, CardActionArea, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';

const BaubleCard = ({ id, owner, setEditModal, setDeleteModal, children }) => (
  <Card sx={{ position: 'relative' }} component="div">
    <Box zIndex={1} position="absolute" display="flex" gap={1} right={0} mr={2} mt={2}>
      <IconButton onClick={() => setEditModal({ id, name: children })} size="large" color="primary">
        <Edit />
      </IconButton>
      <IconButton onClick={() => setDeleteModal({ id, name: children })} size="large" color="error">
        <Delete />
      </IconButton>
    </Box>
    <CardActionArea
      component={Link}
      to={`${routes.editor}?owner=${owner}&bauble=${id}`}
      sx={{
        p: 3,
        width: 1,
        height: '8rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant="h5">{children}</Typography>
    </CardActionArea>
  </Card>
);

export default BaubleCard;
