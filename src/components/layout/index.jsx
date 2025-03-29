import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import ScrollToTop from "../scrollToTop";
import BotChat from "../../boxchat";

function Layout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      {/* Content của page  */}
      <Outlet />
      <BotChat />
      <Footer />
    </>
  );
}

export default Layout;
