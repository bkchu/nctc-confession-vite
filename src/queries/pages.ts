import { useMemo } from 'react';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQueries,
  useQuery
} from 'react-query';
import { useVersionContext } from 'hooks';
import { bibleIds } from 'services/bible';
import { BibleAPISearchResponse } from 'services/types/bible';
import { stripHtml } from 'string-strip-html';
import { PageContent, PageLink } from 'types';
import { queryClient, supabase } from 'utils';
import { bibleApi } from 'utils/axiosClient';
import { bibleVerseParser, verseReferenceRegex } from 'utils/verseParser';

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

export const useGetVerses = (
  {
    bibleId,
    verseReferences
  }: {
    bibleId: string;
    verseReferences: string[];
  },
  enabled?: boolean
) => {
  // gets multiple verses at once
  const queries = useQueries(
    verseReferences.map((verseReference) => ({
      queryKey: [bibleId, verseReference],
      queryFn: async () => {
        const response = await bibleApi.get<BibleAPISearchResponse>(
          `/bibles/${bibleId}/search?query=${verseReference}`
        );

        return {
          verseReference,
          content: stripHtml(response.data.data.passages[0].content).result
        };
      },
      enabled: !!enabled,

      // set these to false so that the query will not be re-run
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: true
    }))
  );

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  if (isLoading) {
    return { isLoading: true, verses: undefined };
  }

  if (isError) {
    return { isLoading: false, isError: true, verses: undefined };
  }

  return {
    isLoading: false,
    verses: queries.reduce<{ [verseReference: string]: string }>(
      (acc, query) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        acc[query.data!.verseReference] = query.data!.content;
        return acc;
      },
      {}
    )
  };
};

export const useGetPageMarkdown = (slug?: string) => {
  const { version } = useVersionContext();
  const bibleId = bibleIds[version];
  const { data: pageContent, isLoading: isLoadingPageContent } =
    useGetPageContent(slug);

  const { isLoading: isLoadingVerses, verses } = useGetVerses(
    {
      bibleId,
      verseReferences: pageContent?.content
        ? pageContent.content.match(verseReferenceRegex) ?? []
        : []
    },
    !!pageContent?.content
  );

  const replacedString = useMemo(() => {
    if (!pageContent?.content) {
      return '';
    }

    return bibleVerseParser(
      pageContent.content,
      version,
      (link, matchedText) =>
        `[${matchedText}--${verses?.[matchedText]}](${link})`
    );
  }, [pageContent, version, verses]);

  return {
    isLoading: isLoadingPageContent || isLoadingVerses,
    data: replacedString
  };
};

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
      onError: async (_err, _newContent, context) => {
        queryClient.setQueryData(queryKey, context?.previousContent);
        await useMutationOptions?.onError?.(_err, _newContent, context);
      },
      // Always refetch after error or success:
      onSettled: async () => {
        await queryClient.invalidateQueries(queryKey);
      }
    }
  );
};
