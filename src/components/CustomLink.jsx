import React from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink, scroller, animateScroll } from "react-scroll";

export const CustomLink = ({ to, children, smooth, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    if (to === "/about-us" || to === "/contact-us") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(to.slice(1));
      }, 100);
    } else {
      navigate(to);
      animateScroll.scrollToTop({
        duration: 150,
        smooth: true,
      });
    }
  };

  if (
    (to === "/about-us" || to === "/contact-us") &&
    location.pathname === "/"
  ) {
    return (
      <ScrollLink to={to.slice(1)} smooth={smooth} {...props}>
        {children}
      </ScrollLink>
    );
  }

  return (
    <RouterLink to={to} onClick={handleClick} {...props}>
      {children}
    </RouterLink>
  );
};
