import { Container } from '@mui/material';
import withUser from 'modules/Login/withUser';
import DisplayName from 'modules/DisplayName';
import PersonalBaubles from 'modules/PersonalBaubles';

const Profile = () => (
  <Container sx={{ my: 4 }}>
    <DisplayName />
    <PersonalBaubles />
  </Container>
);

export default withUser(Profile);
