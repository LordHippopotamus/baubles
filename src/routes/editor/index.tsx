import { getDoc, getValidatedUser } from 'lib/firebase';
import { ActionFunction, LoaderFunction, redirect } from 'react-router-dom';
import Palette from './Palette';
import Area from './Area';
import { setDoc } from 'lib/firebase';
import { Box } from '@mui/material';
import { Bauble as TBauble, Area as TArea, Palette as TPalette } from 'types';
import { FC } from 'react';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  if (request.method === 'PUT') {
    const bauble = formData.get('bauble') as TBauble['id'];
    const area = JSON.parse(formData.get('area') as string) as TArea;
    const palette = JSON.parse(formData.get('palette') as string) as TPalette;

    await setDoc(['baubles', bauble], { area, palette });

    return 1;
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const baubleId = url.searchParams.get('bauble') as string;
  const currentUser = await getValidatedUser();

  if (!currentUser) return redirect('/signin');

  try {
    const bauble = await getDoc<TBauble>(['baubles', baubleId]);
    // TODO: implement error route
    if (bauble.owner !== currentUser.uid) return redirect('/error');
    return bauble;
  } catch (error: any) {
    if (error.message === 'does-not-exist') return redirect('/error');
    return redirect('/error');
  }
};

const Editor: FC = () => (
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
