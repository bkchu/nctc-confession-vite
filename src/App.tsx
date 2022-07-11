import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { NavbarLayout, SidebarLayout } from 'layouts';
import { Edit, Home, Login, Page, SignUp } from 'views';

const App = () => {
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.setAttribute('data-color-mode', 'dark');
    } else {
      document.documentElement.setAttribute('data-color-mode', 'light');
    }
  }, []);

  return (
    <>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route element={<SidebarLayout />}>
            <Route index element={<Home />} />
            <Route path="page/:slug" element={<Page />} />
            <Route path="page/:slug/edit" element={<Edit />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
      <Toaster
        toastOptions={{
          duration: 300000
        }}
        position="top-right"
        reverseOrder={false}
        gutter={8}
      />
    </>
  );
};

export default App;
