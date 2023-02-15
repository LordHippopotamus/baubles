import { useUserStore } from 'hooks';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/display-name */
const withUser = Component => () => {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();

  if (user === null) navigate('/login');

  return <Component user={user} />;
};

export default withUser;
