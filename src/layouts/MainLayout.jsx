import React from 'react';
import { Outlet } from 'react-router';
import NavbarClient from '../components/navbar/NavbarClient';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <NavbarClient />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
