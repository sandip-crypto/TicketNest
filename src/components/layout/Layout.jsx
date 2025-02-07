import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="pt-[254px] sm:pt-[100px] md:pt-[100px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
