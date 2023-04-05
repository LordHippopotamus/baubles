import { Card as MuiCard, CardActionArea, CardContent, Typography } from '@mui/material';

const Card = ({ bauble }) => (
  <MuiCard>
    <CardActionArea>
      <CardContent>
        <Typography variant="h5">{bauble.name}</Typography>
      </CardContent>
    </CardActionArea>
  </MuiCard>
);

export default Card;
