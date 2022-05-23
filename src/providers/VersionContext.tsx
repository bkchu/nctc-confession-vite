import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { Version } from 'types';

export interface IVersionContext {
  version: Version;
  setVersion(version: Version): void;
}

export const VersionContext = createContext<IVersionContext | null>(null);

type VersionProviderProps = {
  children: ReactNode;
};

export const VersionProvider = ({
  children
}: VersionProviderProps): JSX.Element => {
  const [versionState, setVersionState] = useState<Version>();

  useEffect(() => {
    const localVersion = localStorage.getItem('Version');
    if (localVersion) {
      setVersionState(localVersion as Version);
      localStorage.setItem('Version', localVersion);
    } else {
      setVersionState('NKJV');
      localStorage.setItem('Version', 'NKJV');
    }
  }, []);

  const contextValue = useMemo(() => {
    const setVersion = (version: Version) => {
      setVersionState(version);
      localStorage.setItem('Version', version);
    };

    return {
      version: versionState as Version,
      setVersion
    };
  }, [versionState]);

  return (
    <VersionContext.Provider value={contextValue}>
      {children}
    </VersionContext.Provider>
  );
};
