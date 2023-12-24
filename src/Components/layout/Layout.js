import React from "react";
import Navbar from "../navbar/Navbar";
import { Footer } from "../pages/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}

      <Footer />
    </>
  );
};

export default Layout;
