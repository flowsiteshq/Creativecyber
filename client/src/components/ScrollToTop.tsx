import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop — mounts inside the Router and fires window.scrollTo(0, 0)
 * every time the pathname changes, ensuring every page navigation starts
 * at the very top of the new page.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
