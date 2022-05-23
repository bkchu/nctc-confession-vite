import { Outlet } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import { useMenuContext } from 'hooks/useMenuContext';

export const SidebarLayout = () => {
  const { setIsOpen, isOpen } = useMenuContext();

  return (
    <>
      <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />

      <div className="w-full md:w-[calc(100%_-_18rem)]">
        <div className="p-4 mx-auto max-w-prose">
          <Outlet />
        </div>
      </div>
    </>
  );
};
