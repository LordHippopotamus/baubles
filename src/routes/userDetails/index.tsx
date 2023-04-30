import { Container } from '@mui/material';
import { getValidatedUser, getDocs, addDoc, setDoc, deleteDoc } from 'lib/firebase';
import { limit, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { useLoaderData } from 'react-router-dom';
import { generateArea } from 'utils/generateArea';
import { generatePalette } from 'utils/generatePalette';
import BaublesList from './BaublesList';
import CreateBauble from './CreateBauble';
import UserInfo from './UserInfo';
import { getDoc } from 'lib/firebase/firestore';

export const loader = async ({ params }) => {
  const validateUser = await getValidatedUser();
  try {
    const user = await getDoc(['users', params.uid]);
    const baubles = await getDocs(
      ['baubles'],
      [where('owner', '==', params.uid), orderBy('createdAt', 'desc'), limit(10)]
    );

    return { user, baubles, isOwner: validateUser.uid === user.uid };
  } catch (error) {
    if (error.message === 'does-not-exist') throw new Response('User Not Found', { status: 404 });
  }
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

const UserDetails = () => {
  const { user, baubles, isOwner } = useLoaderData();

  return (
    <Container sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <UserInfo user={user} />
      {isOwner && <CreateBauble />}
      <BaublesList baubles={baubles} />
    </Container>
  );
};

export default UserDetails;
