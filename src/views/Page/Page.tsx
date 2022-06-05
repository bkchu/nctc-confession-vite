import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { PageLoader, VersePopover } from 'components';
import { useGetPageMarkdown } from 'queries/pages';
import remarkGfm from 'remark-gfm';

export const Page = () => {
  const params = useParams<{ slug: string }>();

  const { data: markdown, isLoading: isLoadingPage } = useGetPageMarkdown(
    params.slug
  );

  if (isLoadingPage) {
    return <PageLoader />;
  }

  return (
    <>
      {markdown ? (
        <article className="prose prose-slate dark:prose-invert">
          <ReactMarkdown
            rehypePlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => {
                const [verseReference, verse] = (
                  props.children[0] as string
                ).split('--');

                // if verse is not able to be fetched via the bibleApi
                // only show the verse reference
                return verse === 'undefined' ? (
                  <span>{verseReference}</span>
                ) : (
                  <VersePopover
                    verse={verse}
                    verseReference={verseReference}
                    {...props}
                  />
                );
              }
            }}
          >
            {markdown}
          </ReactMarkdown>
          <div className="my-24">
            <Link
              to="edit"
              className="text-violet-500 underlined focus:outline-none hover:text-black focus:text-black hover:dark:text-white focus:dark:text-white "
            >
              Edit
            </Link>
            <hr />
            <p className="italic text-right">
              &copy; 2022 NCTC. All rights reserved.
            </p>
          </div>
        </article>
      ) : null}
    </>
  );
};
