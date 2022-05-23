import { UseQueryOptions, useQuery } from 'react-query';
import { PageContent, PageLink } from 'types';
import { supabase } from 'utils';

export const useGetLinks = (
  useQueryOptions?: UseQueryOptions<PageLink[], Error>
) => {
  const email = supabase.auth.user()?.email;
  return useQuery<PageLink[], Error>(
    ['links', { email }],
    async () => {
      const { data, error } = await supabase
        .from<PageLink>('Pages')
        .select('title,slug,page_group,page_number');

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    useQueryOptions
  );
};

export const useGetPageContent = (
  slug?: string,
  useQueryOptions?: UseQueryOptions<PageContent | undefined, Error>
) => {
  const email = supabase.auth.user()?.email;
  return useQuery<PageContent | undefined, Error>(
    ['page', slug, { email }],
    async () => {
      if (!slug) {
        return;
      }

      const { data, error } = await supabase
        .from<PageContent>('Pages')
        .select('content,slug')
        .eq('slug', slug)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    { ...useQueryOptions, enabled: !!slug }
  );
};
