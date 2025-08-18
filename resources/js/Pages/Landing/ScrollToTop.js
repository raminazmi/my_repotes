import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [window.location.pathname]);

  return null;
}
