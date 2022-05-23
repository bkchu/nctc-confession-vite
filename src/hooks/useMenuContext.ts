import { useContext } from 'react';
import { MenuContext } from 'providers';

/**
 * @this: void
 */
export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error(
      'Something went wrong. Please place a context provider above this component in the tree.'
    );
  }

  return context;
};
