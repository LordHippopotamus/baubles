import { useRouteLoaderData } from 'react-router-dom';
import { getDoc } from 'lib/firebase/firestore';

export const useUser = () => useRouteLoaderData('root');

export const useUserDetails = async uid => await getDoc(['users', uid]);
