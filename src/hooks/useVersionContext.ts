import { useContext } from 'react';
import { VersionContext } from 'providers/VersionContext';

/**
 * @this: void
 */
export const useVersionContext = () => {
  const context = useContext(VersionContext);

  if (!context) {
    throw new Error(
      'Something went wrong. Please place a context provider above this component in the tree.'
    );
  }

  return context;
};
