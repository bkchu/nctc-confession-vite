import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DarkModeSwitcher, Popover, Select, Text } from 'components';
import { useVersionContext } from 'hooks';
import { useMenuContext } from 'hooks/useMenuContext';
import { Version, Versions } from 'types';
import { supabase } from 'utils';
import Book from '~icons/heroicons-outline/book-open';
import Menu from '~icons/heroicons-outline/menu-alt3';

export const NavbarLayout = () => {
  const { setIsOpen } = useMenuContext();
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { setVersion, version } = useVersionContext();
  const versions = Object.keys(Versions).map((key) => ({
    label: key,
    onClick: () => setVersion(key as Version)
  }));

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    navigate(0);
  };

  const isOnLoginOrSignUp =
    location.pathname === '/login' || location.pathname === '/sign-up';

  return (
    <div className="min-h-screen dark:bg-slate-800">
      <div className="grid max-w-screen-lg grid-cols-12 gap-4 mx-auto">
        <div className="flex items-center justify-between col-span-12 p-4">
          <Link to="/" className="flex items-center">
            <svg
              className="w-12 h-12"
              width="274"
              height="307"
              viewBox="0 0 274 307"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M146.217 27.4401V145.04H113.624L68.9364 91.6162V145.04H30.2963V27.4401H62.8884L107.576 80.8642V27.4401H146.217Z"
                className="fill-violet-500"
              />
              <path
                d="M70.3923 190.184H35.9523V159.44H144.481V190.184H110.04V277.041H70.3923V190.184Z"
                className="fill-violet-500"
              />
              <path
                d="M220.073 147.728C207.641 147.728 196.441 145.152 186.473 140C176.505 134.736 168.665 127.456 162.953 118.16C157.353 108.752 154.553 98.1122 154.553 86.2402C154.553 74.3682 157.353 63.7841 162.953 54.4881C168.665 45.0801 176.505 37.8001 186.473 32.6481C196.441 27.384 207.641 24.752 220.073 24.752C231.497 24.752 241.689 26.768 250.649 30.8001C259.609 34.8321 267.001 40.6561 272.825 48.2721L247.793 70.6161C240.513 61.4321 231.945 56.8401 222.089 56.8401C213.801 56.8401 207.137 59.5281 202.097 64.9041C197.057 70.1681 194.537 77.2802 194.537 86.2402C194.537 95.2002 197.057 102.368 202.097 107.744C207.137 113.008 213.801 115.64 222.089 115.64C231.945 115.64 240.513 111.048 247.793 101.864L272.825 124.208C267.001 131.824 259.609 137.648 250.649 141.68C241.689 145.712 231.497 147.728 220.073 147.728Z"
                className="fill-violet-500"
              />
              <path
                d="M220.073 279.729C207.641 279.729 196.441 277.153 186.473 272.001C176.505 266.737 168.665 259.457 162.953 250.161C157.353 240.753 154.553 230.113 154.553 218.241C154.553 206.369 157.353 195.784 162.953 186.488C168.665 177.08 176.505 169.8 186.473 164.648C196.441 159.384 207.641 156.752 220.073 156.752C231.497 156.752 241.689 158.768 250.649 162.8C259.609 166.832 267.001 172.656 272.825 180.272L247.793 202.617C240.513 193.432 231.945 188.84 222.089 188.84C213.801 188.84 207.137 191.528 202.097 196.904C197.057 202.169 194.537 209.281 194.537 218.241C194.537 227.201 197.057 234.369 202.097 239.745C207.137 245.009 213.801 247.641 222.089 247.641C231.945 247.641 240.513 243.049 247.793 233.865L272.825 256.209C267.001 263.825 259.609 269.649 250.649 273.681C241.689 277.713 231.497 279.729 220.073 279.729Z"
                className="fill-violet-500"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H273.841V16.8H16.8V290.081H273.841V306.881H0V0Z"
                className="fill-violet-500"
              />
            </svg>
            <Text
              variant="h1"
              className="hidden ml-4 font-thin tracking-tight uppercase md:block dark:text-white"
            >
              Confession
            </Text>
          </Link>
          <div className="flex items-center justify-between gap-4">
            {!isOnLoginOrSignUp && (
              <>
                <Popover
                  placement="top-end"
                  render={({ close }) => (
                    <div
                      id="dropdownDivider"
                      className=" min-w-[256px] z-10 bg-white divide-y rounded shadow divide-slate-100 dark:bg-slate-800 dark:border dark:border-slate-700 dark:divide-slate-600"
                    >
                      <div
                        className="flex items-center gap-4 px-4 py-3 text-sm text-slate-700 dark:text-slate-200"
                        aria-labelledby="dropdownDividerButton"
                      >
                        <Select defaultValue={version} items={versions} />
                        <DarkModeSwitcher />
                      </div>
                      {supabase.auth.user() ? (
                        <div className="py-1">
                          <p className="block px-4 pt-2 text-sm text-slate-700 dark:text-slate-200">
                            Signed in as: <br />
                          </p>
                          <p className="block px-4 pb-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                            {supabase.auth.user()?.email}
                          </p>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-slate-700 bg-violet-50 dark:bg-violet-800 hover:bg-violet-200 dark:hover:bg-violet-600 dark:text-slate-200 dark:hover:text-white"
                            onClick={() => {
                              void signOut();
                              close();
                            }}
                          >
                            Sign out
                          </a>
                        </div>
                      ) : (
                        <div className="py-1">
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-slate-700 bg-violet-50 dark:bg-violet-800 hover:bg-violet-200 dark:hover:bg-violet-600 dark:text-slate-200 dark:hover:text-white"
                          >
                            Sign in
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                >
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 ring-expand">
                    <Book className="w-5 h-5 text-slate-800 dark:text-white" />
                  </button>
                </Popover>
                <button
                  className="flex items-center justify-center w-12 h-12 md:hidden"
                  onClick={() => setIsOpen(true)}
                >
                  <Menu className="w-5 h-5 text-slate-800 dark:text-white" />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex items-start col-span-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
