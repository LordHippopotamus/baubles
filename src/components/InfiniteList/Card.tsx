import { Card as MuiCard, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';
import { FC } from 'react';
import { Bauble } from 'types';

type Props = {
  bauble: Bauble;
};

const Card: FC<Props> = ({ bauble }) => (
  <MuiCard>
    <CardActionArea component={Link} to={routes.baubles.details + bauble.id}>
      <CardContent>
        <Typography variant="h5">{bauble.name}</Typography>
      </CardContent>
    </CardActionArea>
  </MuiCard>
);

export default Card;
