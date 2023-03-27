import { Container } from '@mui/material';
import { getValidatedUser, getDocs, addDoc, setDoc, deleteDoc } from 'lib/firebase';
import { redirect, useLoaderData } from 'react-router-dom';
import { routes } from 'utils/routes';
import { generateArea } from 'utils/generateArea';
import BaublesList from './BaublesList';
import CreateBaubleDialog from './CreateBaubleDialog';

export const loader = async () => {
  const user = await await getValidatedUser();
  if (!user) return redirect(routes.signin);

  const baubles = await getDocs(['users', user.uid, 'baubles']);

  return baubles.map(el => ({ ...el, owner: user.uid }));
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const user = await await getValidatedUser();

  request.method === 'POST' &&
    (await addDoc(['users', user.uid, 'baubles'], {
      name: formData.get('name'),
      area: generateArea(formData.get('columns'), formData.get('rows')),
    }));

  request.method === 'PATCH' &&
    (await setDoc(['users', user.uid, 'baubles', formData.get('baubleId')], {
      name: formData.get('name'),
    }));

  request.method === 'DELETE' &&
    (await deleteDoc(['users', user.uid, 'baubles', formData.get('id')]));

  return 1;
};

const Profile = () => {
  const baubles = useLoaderData();

  return (
    <Container>
      <CreateBaubleDialog />
      <BaublesList baubles={baubles} />
    </Container>
  );
};

export default Profile;
