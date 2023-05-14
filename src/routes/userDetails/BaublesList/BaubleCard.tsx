import { Delete, Edit } from '@mui/icons-material';
import { Box, Card, CardActionArea, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Bauble } from 'types';
import { routes } from 'utils/routes';
import { FC } from 'react';

type Props = {
  bauble: Bauble;
  openEditModal: () => void;
  openDeleteModal: () => void;
};

const BaubleCard: FC<Props> = ({ bauble, openEditModal, openDeleteModal }) => (
  <Card sx={{ position: 'relative' }} component="div">
    <Box zIndex={1} position="absolute" display="flex" gap={1} right={0} mr={2} mt={2}>
      <IconButton onClick={openEditModal} size="large" color="primary">
        <Edit />
      </IconButton>
      <IconButton onClick={openDeleteModal} size="large" color="error">
        <Delete />
      </IconButton>
    </Box>
    <CardActionArea
      component={Link}
      to={`${routes.editor}?bauble=${bauble.id}`}
      sx={{
        p: 3,
        width: 1,
        height: '8rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant="h5">{bauble.name}</Typography>
    </CardActionArea>
  </Card>
);

export default BaubleCard;
