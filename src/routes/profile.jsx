import { Container } from '@mui/material';
import { DisplayName, PersonalBaubles, withUser } from 'components';

const Profile = () => (
  <Container sx={{ my: 4 }}>
    <DisplayName />
    <PersonalBaubles />
  </Container>
);

export default withUser(Profile, { requireAuthorization: true });
