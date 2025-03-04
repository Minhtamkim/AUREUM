import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // mỗi khi pathname thay đổi thì sẽ cuộn lên đầu trang

  return null;
}

export default ScrollToTop;
