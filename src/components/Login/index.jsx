import { Box, Container, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Login = () => {
  const [tab, setTab] = useState('signIn');

  return (
    <Container>
      <Paper
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        elevation={1}
      >
        <Tabs
          value={tab}
          onChange={(event, value) => {
            setTab(value);
          }}
          variant="fullWidth"
        >
          <Tab label="Sign In" value="signIn" />
          <Tab label="Sign Up" value="signUp" />
        </Tabs>
        <Box p={2}>
          {tab === 'signIn' && <SignInForm />}
          {tab === 'signUp' && <SignUpForm />}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
