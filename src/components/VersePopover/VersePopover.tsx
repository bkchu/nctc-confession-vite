/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Popover } from 'components';
import { useVersionContext } from 'hooks';
import NarrowArrowRight from '~icons/heroicons-outline/arrow-narrow-right';

type VerseTooltipProps = {
  verseReference: string;
  verse: string;
};

export const VersePopover = ({
  verse,
  verseReference,
  ...rest
}: VerseTooltipProps) => {
  const { version } = useVersionContext();
  return (
    <Popover
      render={({ close, labelId, descriptionId }) => (
        <span className="z-50 block max-w-sm p-6 prose bg-white border rounded-lg shadow-md border-slate-200 prose-slate dark:prose-invert dark:bg-slate-800 dark:border-slate-700">
          <blockquote
            className="px-8 overflow-y-auto dark:text-white max-h-[29vh]"
            id={descriptionId}
          >
            {verse} <br />
          </blockquote>
          <cite className="dark:text-white" id={labelId}>
            {verseReference} KJV
          </cite>
          <br />
          <a
            className="dark:text-white"
            target="_blank"
            {...rest}
            onClick={close}
          >
            Open {version} in YouVersion
            <NarrowArrowRight className="inline-block ml-2" />
          </a>
        </span>
      )}
    >
      <button
        type="button"
        className="px-2 py-1 text-xs font-medium text-center text-black bg-purple-200 rounded-lg dark:text-white hover:bg-purple-300 focus:ring-4 focus:outline-none focus:ring-purple-400 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 opacity-80"
      >
        {verseReference}
      </button>
    </Popover>
  );
};
