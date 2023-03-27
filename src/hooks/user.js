import { useRouteLoaderData } from 'react-router-dom';

export const useUser = () => useRouteLoaderData('root');
