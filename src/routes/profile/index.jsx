import { Container } from '@mui/material';
import { getValidatedUser, getDocs, addDoc, setDoc, deleteDoc } from 'lib/firebase';
import { limit, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { redirect, useLoaderData } from 'react-router-dom';
import { routes } from 'utils/routes';
import { generateArea } from 'utils/generateArea';
import { generatePalette } from 'utils/generatePalette';
import BaublesList from './BaublesList';
import CreateBaubleDialog from './CreateBaubleDialog';
import DisplayName from './DisplayName';

export const loader = async () => {
  const user = await getValidatedUser();
  if (!user) return redirect(routes.signin);

  return await getDocs(
    ['baubles'],
    [where('owner', '==', user.uid), orderBy('createdAt', 'desc'), limit(10)]
  );
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const user = await getValidatedUser();

  request.method === 'POST' &&
    (await addDoc(['baubles'], {
      name: formData.get('name'),
      area: generateArea(formData.get('columns'), formData.get('rows')),
      palette: generatePalette(),
      owner: user.uid,
      createdAt: serverTimestamp(),
    }));

  request.method === 'PATCH' &&
    (await setDoc(['baubles', formData.get('baubleId')], {
      name: formData.get('name'),
    }));

  request.method === 'DELETE' && (await deleteDoc(['baubles', formData.get('id')]));

  return 1;
};

const Profile = () => {
  const baubles = useLoaderData();

  return (
    <Container sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <DisplayName />
      <CreateBaubleDialog />
      <BaublesList baubles={baubles} />
    </Container>
  );
};

export default Profile;
