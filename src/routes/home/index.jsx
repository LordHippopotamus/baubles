import { Container, Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { limit, orderBy } from 'firebase/firestore';
import { getDocs } from 'lib/firebase';
import { useLoaderData } from 'react-router-dom';

export const loader = async () =>
  await getDocs(['baubles'], [orderBy('createdAt', 'desc'), limit(10)]);

const Home = () => {
  const baubles = useLoaderData();

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={2}>
        {baubles.map(bauble => (
          <Grid item xs={12} md={6} key={bauble.id}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5">{bauble.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
