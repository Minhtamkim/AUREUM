import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import ScrollToTop from "../scrollToTop";

function Layout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      {/* Content của page  */}
      <Outlet />

      <Footer />
    </>
  );
}

export default Layout;
