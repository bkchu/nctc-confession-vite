import { useAuthRedirect } from 'hooks';

export const Edit = () => {
  useAuthRedirect();

  return <p>This is the edit page!</p>;
};
