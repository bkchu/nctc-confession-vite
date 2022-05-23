import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState
} from 'react';

export interface IMenuContext {
  isOpen: boolean | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean | undefined>>;
}

export const MenuContext = createContext<IMenuContext | null>(null);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body')?.classList.add('overflow-hidden');
    } else {
      document.querySelector('body')?.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  const contextValue = useMemo(() => {
    return { isOpen, setIsOpen };
  }, [isOpen, setIsOpen]);

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};
