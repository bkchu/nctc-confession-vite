import { useContext } from 'react';
import { AuthContext } from 'providers/AuthContext';

/**
 * @this: void
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'Something went wrong. Please place a context provider above this component in the tree.'
    );
  }

  return context;
};
