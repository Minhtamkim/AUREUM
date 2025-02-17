import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

function Layout() {
  return (
    <>
      <Header />

      {/* Content của page  */}
      <Outlet />

      <Footer />
    </>
  );
}

export default Layout;
