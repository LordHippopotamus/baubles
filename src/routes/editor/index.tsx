import { getDoc, getValidatedUser } from 'lib/firebase';
import { redirect } from 'react-router-dom';
import Palette from './Palette';
import Area from './Area';
import { setDoc } from 'lib/firebase';
import { Box } from '@mui/material';

export const action = async ({ request }) => {
  if (request.method === 'PUT') {
    const formData = await request.formData();
    const area = JSON.parse(formData.get('area'));
    const palette = JSON.parse(formData.get('palette'));
    const bauble = formData.get('bauble');

    await setDoc(['baubles', bauble], { area, palette });

    return 1;
  }
};

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const baubleId = url.searchParams.get('bauble');
  const currentUser = await getValidatedUser();

  try {
    const bauble = await getDoc(['baubles', baubleId]);
    if (bauble.owner !== currentUser.uid) return redirect('/error');
    return bauble;
  } catch (error) {
    if (error.message === 'does-not-exist') return redirect('/error');
    return redirect('/error');
  }
};

const Editor = () => (
  <Box
    height={{ xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }}
    display="flex"
    flexDirection="column"
  >
    <Area />
    <Palette />
  </Box>
);

export default Editor;
