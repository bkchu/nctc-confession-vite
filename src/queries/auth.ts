import { UseMutationOptions, useMutation } from 'react-query';
import { Provider, Session, User } from '@supabase/supabase-js';
import { supabase } from 'utils';

export const useLogin = (
  useMutationOptions?: UseMutationOptions<
    {
      session: Session | null;
      user: User | null;
      provider?: Provider;
      url?: string | null;
    },
    Error,
    { email: string; password: string }
  >
) => {
  return useMutation<
    {
      session: Session | null;
      user: User | null;
      provider?: Provider;
      url?: string | null;
    },
    Error,
    { email: string; password: string }
  >(
    ['login'],
    async ({ email, password }) => {
      const { error, ...rest } = await supabase.auth.signIn({
        email,
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      return rest;
    },
    useMutationOptions
  );
};

export const useSignUp = (
  useMutationOptions?: UseMutationOptions<
    {
      session: Session | null;
      user: User | null;
      provider?: Provider;
      url?: string | null;
    },
    Error,
    { email: string; password: string }
  >
) => {
  return useMutation<
    {
      session: Session | null;
      user: User | null;
      provider?: Provider;
      url?: string | null;
    },
    Error,
    { email: string; password: string }
  >(
    ['login'],
    async ({ email, password }) => {
      const { error, ...rest } = await supabase.auth.signUp({
        email,
        password
      });

      return rest;
    },
    useMutationOptions
  );
};
