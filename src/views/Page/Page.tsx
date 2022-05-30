import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { VersePopover } from 'components';
import { useVersionContext } from 'hooks';
import { useGetPageContent } from 'queries/pages';
import { getConfessionMarkdown } from 'services/bible';

export const Page = () => {
  const params = useParams<{ slug: string }>();
  const { data } = useGetPageContent(params.slug);
  const { version } = useVersionContext();
  const [markdown, setMarkdown] = useState<string | undefined>('');

  const populateVerses = async (content: string) => {
    setMarkdown(await getConfessionMarkdown(content, version));
  };

  useEffect(() => {
    void populateVerses(data?.content ?? '');
  }, [data?.content]);

  return (
    <>
      {markdown ? (
        <article className="prose prose-slate dark:prose-invert">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => {
                const [verseReference, verse] = (
                  props.children[0] as string
                ).split('--');

                return (
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
              className="text-violet-500 underlined focus:outline-none hover:text-black focus:text-black"
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
