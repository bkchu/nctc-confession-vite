import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery
} from 'react-query';
import { PageContent, PageLink } from 'types';
import { queryClient, supabase } from 'utils';

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
  useQueryOptions?: UseQueryOptions<PageContent, Error>
) =>
  useQuery<PageContent, Error>(
    ['page', { slug }],
    async () => {
      if (!slug) {
        return { content: '', slug: '' };
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

export const useUpdatePageContent = (
  theSlug?: string,
  useMutationOptions?: UseMutationOptions<
    PageContent | undefined,
    Error,
    { content: string },
    { previousContent: { content: string; slug: string } }
  >
) => {
  const queryKey = ['page', { slug: theSlug }];

  return useMutation<
    PageContent | undefined,
    Error,
    { content: string },
    { previousContent: { content: string; slug: string } }
  >(
    ['page', { slug: theSlug }],
    async ({ content }) => {
      if (!theSlug) {
        return;
      }

      const { data, error } = await supabase
        .from<PageContent>('Pages')
        .update({ content })
        .eq('slug', theSlug)
        .select('slug,content')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    {
      ...useMutationOptions,
      onMutate: async ({ content }) => {
        // cancel outgoing queries
        await queryClient.cancelQueries(queryKey);

        // get a snapshot of the previous state
        const previousContent = queryClient.getQueryData(queryKey) as {
          slug: string;
          content: string;
        };

        // set the new data
        queryClient.setQueryData(queryKey, content);

        // return the snapshot of previous state (used as a fallback in onError; shape is defined in the mutation types)
        return { previousContent };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (_err, _newContent, context) => {
        queryClient.setQueryData(queryKey, context?.previousContent);
      },
      // Always refetch after error or success:
      onSettled: async () => {
        await queryClient.invalidateQueries(queryKey);
      }
    }
  );
};
