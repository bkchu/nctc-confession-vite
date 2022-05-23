import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useAuthRedirect } from 'hooks';
import { useGetPageContent } from 'queries/pages';
import rehypeSanitize from 'rehype-sanitize';

export const Edit = () => {
  useAuthRedirect();
  const [value, setValue] = useState<string | undefined>('');
  const params = useParams<{ slug: string }>();
  const { data } = useGetPageContent(params.slug);

  useEffect(() => {
    if (data?.content) {
      setValue(data.content);
    }
  }, [data?.content]);
  return (
    <>
      {data?.content ? (
        <>
          <MDEditor
            value={value}
            onChange={setValue}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]]
            }}
            height={750}
          />
        </>
      ) : null}
    </>
  );
};
