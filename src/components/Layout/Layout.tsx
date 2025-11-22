import type { ReactNode } from "react";
import { memo, useMemo } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Layout {
  children: ReactNode;
}

function Layout({ children }: Layout) {
  // Memoize children để tránh re-render không cần thiết
  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <div className="container">
      <Header />
      <main>{memoizedChildren}</main>
      <Footer />
    </div>
  );
}

// Custom comparison function để so sánh children
const areEqual = (prevProps: Layout, nextProps: Layout) => {
  // Nếu children là cùng một reference, không re-render
  return prevProps.children === nextProps.children;
};

export default memo(Layout, areEqual);
