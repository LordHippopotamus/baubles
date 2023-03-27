import { getDoc, getValidatedUser } from 'lib/firebase';
import { redirect } from 'react-router-dom';
import Palette from './Palette';
import Area from './Area';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const ownerId = url.searchParams.get('owner');
  const baubleId = url.searchParams.get('bauble');
  const currentUser = await getValidatedUser();

  if (ownerId !== currentUser.uid) return redirect('/error');

  try {
    const bauble = await getDoc(['users', ownerId, 'baubles', baubleId]);
    return bauble;
  } catch (error) {
    if (error.message === 'does-not-exist') return redirect('/error');
    return redirect('/error');
  }
};

const Editor = () => (
  <>
    <Area />
    <Palette />
  </>
);

export default Editor;
