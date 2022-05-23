import { Fragment, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from 'components/Text';
import { useGetLinks } from 'queries/pages';
import { PageLink } from 'types';

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
        <div className="fixed top-0 bottom-0 z-50 w-full h-auto p-4 overflow-scroll bg-violet-100 md:hidden">
          <div className="flex items-center justify-between mb-4">
            <Text variant="eyebrow">PAGES</Text>
            <button
              className="flex items-center justify-center w-12 h-12 md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
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
                      className={({ isActive }) =>
                        isActive
                          ? 'font-bold bg-violet-200 block px-2 py-1 rounded-sm border-l-violet-400 border-l-4'
                          : 'block px-2 py-1 pl-0'
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
          <Text variant="eyebrow">PAGES</Text>
          <button
            className="flex items-center justify-center w-12 h-12 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {groupedLinks.map((group, index) => (
          <Fragment key={index}>
            <Text
              variant="body"
              className="my-2 text-sm font-bold text-violet-500"
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
                        ? 'font-bold bg-violet-100 block px-2 py-1 rounded-sm border-l-violet-300 border-l-4'
                        : 'block px-2 py-1 pl-0'
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
