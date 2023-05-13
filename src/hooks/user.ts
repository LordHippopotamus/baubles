import { useRouteLoaderData } from 'react-router-dom';
import { getDoc } from 'lib/firebase/firestore';
import { User } from 'firebase/auth';
import { UserDetails } from 'types';

export const useUser = () => useRouteLoaderData('root') as User;

export const useUserDetails = async (uid: string) => (await getDoc(['users', uid])) as UserDetails;
