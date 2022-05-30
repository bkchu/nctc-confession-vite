import { Fragment, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from 'components/Text';
import { useGetLinks } from 'queries/pages';
import { PageLink } from 'types';
import X from '~icons/heroicons-outline/x';

type Props = {
  setIsOpen: (open: boolean) => void;
  isOpen?: boolean;
};

export const Sidebar = ({ setIsOpen, isOpen }: Props) => {
  const [links, setLinks] = useState<PageLink[]>([]);

  useGetLinks({
    onSuccess: (pageLinks) => {
      setLinks(pageLinks);
    },
    enabled: isOpen === undefined || !!isOpen
  });

  const groupedLinks = useMemo(
    () =>
      links.reduce<Array<PageLink[]>>((acc, curr) => {
        const copy = acc.slice();
        if (copy[curr.page_group]) {
          copy[curr.page_group].push(curr);
        } else {
          copy[curr.page_group] = [curr];
        }

        return copy;
      }, []),
    [links]
  );

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 bottom-0 z-50 w-full h-auto p-4 overflow-scroll bg-white dark:bg-slate-800 md:hidden">
          <div className="flex items-center justify-between mb-4">
            <Text variant="eyebrow" className="dark:text-slate-300">
              PAGES
            </Text>
            <button
              className="flex items-center justify-center w-12 h-12 md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5 text-slate-800 dark:text-white" />
            </button>
          </div>
          {groupedLinks.map((group, index) => (
            <Fragment key={index}>
              <Text
                variant="body"
                className="my-2 text-sm font-bold text-violet-400"
              >
                {index}
              </Text>
              <ul className="mb-8">
                {group.map((link) => (
                  <li key={link.slug} className="mb-2 last:mb-0">
                    <NavLink
                      to={`/page/${link.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? 'font-bold bg-violet-100 dark:text-slate-100 dark:bg-violet-800 opacity-80 block px-2 py-1 rounded-sm border-l-violet-300 border-l-4'
                          : 'prose prose-slate block px-2 py-1 pl-0 dark:prose-invert'
                      }
                    >
                      <Text
                        variant="body"
                        as="span"
                        className="text-sm leading-none"
                      >
                        {link.title}
                      </Text>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Fragment>
          ))}
        </div>
      )}
      <div className="hidden md:top-0 md:bottom-0 md:z-50 md:h-auto md:p-4 md:block md:overflow-auto md:w-72 md:sticky">
        <div className="flex items-center justify-between mb-4">
          <Text variant="eyebrow" className="dark:text-slate-300">
            PAGES
          </Text>
          <button
            className="flex items-center justify-center w-12 h-12 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5 text-slate-800 dark:text-white" />
          </button>
        </div>
        {groupedLinks.map((group, index) => (
          <Fragment key={index}>
            <Text
              variant="body"
              className="my-2 text-sm font-bold text-violet-500 dark:text-violet-400"
            >
              {index}
            </Text>
            <ul className="mb-8">
              {group.map((link) => (
                <li key={link.slug} className="mb-2 last:mb-0">
                  <NavLink
                    to={`/page/${link.slug}`}
                    className={({ isActive }) =>
                      isActive
                        ? 'font-bold bg-violet-100 dark:text-slate-100 dark:bg-violet-800 opacity-80 block px-2 py-1 rounded-sm border-l-violet-300 border-l-4'
                        : 'prose prose-slate block px-2 py-1 pl-0 dark:prose-invert'
                    }
                  >
                    <Text
                      variant="body"
                      as="span"
                      className="text-sm leading-none"
                    >
                      {link.title}
                    </Text>
                  </NavLink>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </>
  );
};
