import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { useVersionContext } from 'hooks';
import { useGetPageContent } from 'queries/pages';
import { bibleVerseParser } from 'utils/verseParser';

export const Page = () => {
  const params = useParams<{ slug: string }>();
  const { data } = useGetPageContent(params.slug);
  const { version } = useVersionContext();
  const replacedString = bibleVerseParser(
    data?.content ?? '',
    version,
    (link, matchedText) => `[${matchedText}](${link})`
  );
  return (
    <article className="prose">
      {data?.content ? (
        <>
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => <a target="_blank" {...props} />
            }}
          >
            {replacedString}
          </ReactMarkdown>
          <div className="mt-24">
            <Link
              to="edit"
              className="text-violet-500 underlined focus:outline-none hover:text-black focus:text-black"
            >
              Edit
            </Link>
          </div>
          <hr />
          <p className="italic text-right">
            &copy; 2022 NCTC. All rights reserved.
          </p>
        </>
      ) : null}
    </article>
  );
};
