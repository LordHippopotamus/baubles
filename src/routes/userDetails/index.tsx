import { Container } from '@mui/material';
import { getValidatedUser, getDocs, addDoc, setDoc, deleteDoc } from 'lib/firebase';
import { limit, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { ActionFunction, LoaderFunction, useLoaderData } from 'react-router-dom';
import { generateArea } from 'utils/generateArea';
import { generatePalette } from 'utils/generatePalette';
import BaublesList from './BaublesList';
import CreateBauble from './CreateBauble';
import UserInfo from './UserInfo';
import { getDoc } from 'lib/firebase/firestore';
import { Bauble, UserDetails as TUserDetails } from 'types';

export const loader: LoaderFunction = async ({ params }) => {
  const validateUser = await getValidatedUser();
  try {
    const user = await getDoc<TUserDetails>(['users', params.uid as string]);
    const baubles = await getDocs<Bauble[]>(
      ['baubles'],
      [where('owner', '==', params.uid), orderBy('createdAt', 'desc'), limit(10)]
    );

    return { user, baubles, isOwner: validateUser?.uid === user.uid };
  } catch (error: any) {
    if (error.message === 'does-not-exist') throw new Response('User Not Found', { status: 404 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = await getValidatedUser();

  if (request.method === 'POST') {
    const { columns, rows } = Object.fromEntries(formData) as { columns: string; rows: string };
    await addDoc(['baubles'], {
      name: formData.get('name'),
      area: generateArea(+columns, +rows),
      palette: generatePalette(),
      owner: user?.uid,
      createdAt: serverTimestamp(),
    });
  }

  if (request.method === 'PATCH') {
    await setDoc(['baubles', formData.get('baubleId') as string], {
      name: formData.get('name'),
    });
  }

  if (request.method === 'DELETE') await deleteDoc(['baubles', formData.get('id') as string]);

  return 1;
};

const UserDetails = () => {
  const {
    user,
    baubles: initialBaubles,
    isOwner,
  } = useLoaderData() as {
    user: TUserDetails;
    baubles: Bauble[];
    isOwner: boolean;
  };

  return (
    <Container sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <UserInfo user={user} />
      {isOwner && <CreateBauble />}
      <BaublesList ownerId={user.uid} initialBaubles={initialBaubles} isOwner={isOwner} />
    </Container>
  );
};

export default UserDetails;
