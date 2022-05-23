import { Route, Routes } from 'react-router-dom';
import { NavbarLayout, SidebarLayout } from 'layouts';
import { Edit, Home, Login, Page, SignUp } from 'views';

const App = () => (
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
);

export default App;
