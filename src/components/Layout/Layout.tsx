import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Layout {
  children: ReactNode;
}

function Layout({ children }: Layout) {
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
