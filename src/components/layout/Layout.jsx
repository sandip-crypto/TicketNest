import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="pt-[260px] sm:pt-[165px] md:pt-[168px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
