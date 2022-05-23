import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from 'utils';

export interface IAuthContext {
  user: User | undefined | null;
  session: Session | undefined | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined | null>(undefined);
  const [session, setSession] = useState<Session | undefined | null>(undefined);

  useEffect(() => {
    setSession(supabase.auth.session() ?? undefined);
    setUser(supabase.auth.session()?.user ?? undefined);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, theSession) => {
        setSession(theSession);
        setUser(theSession?.user ?? null);
      }
    );

    return () => authListener?.unsubscribe();
  }, []);

  const contextValue = useMemo(() => {
    return {
      user,
      session
    };
  }, [user, session]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
