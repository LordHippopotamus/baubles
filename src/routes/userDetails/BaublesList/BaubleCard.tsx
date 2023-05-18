import { Delete, Edit } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Bauble } from 'types';
import { routes } from 'utils/routes';
import { FC, MouseEvent, MouseEventHandler } from 'react';

type Props = {
  bauble: Bauble;
  isOwner: boolean;
  openEditModal: () => void;
  openDeleteModal: () => void;
};

const BaubleCard: FC<Props> = ({ bauble, isOwner, openEditModal, openDeleteModal }) => {
  const navigate = useNavigate();

  const handlerWithoutPropagation = (event: MouseEvent, handler: MouseEventHandler) => {
    event.stopPropagation();
    return handler(event);
  };

  const handleNavigate = () =>
    navigate(isOwner ? `${routes.editor}?bauble=${bauble.id}` : `/baubles/${bauble.id}`);

  return (
    <Card>
      <CardActionArea component="div" onClick={handleNavigate}>
        <CardContent
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
          component="div"
        >
          <Typography variant="h5">{bauble.name}</Typography>
          {isOwner && (
            <Box display="flex" gap={1}>
              <IconButton
                onClick={event => handlerWithoutPropagation(event, openEditModal)}
                size="large"
                color="primary"
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={event => handlerWithoutPropagation(event, openDeleteModal)}
                size="large"
                color="error"
              >
                <Delete />
              </IconButton>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BaubleCard;
