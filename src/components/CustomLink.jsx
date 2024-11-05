import React from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink, scroller, animateScroll } from "react-scroll";

export const CustomLink = ({
  to,
  children,
  smooth = true,
  duration = 500,
  className,
  onClick,
  ...props
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    if (to === "/contactanos") {
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
    if (onClick) {
      onClick();
    }
  };

  if (to === "/contactanos" && location.pathname === "/") {
    return (
      <ScrollLink
        to="contactanos"
        smooth={smooth}
        duration={duration}
        className={className}
        {...props}
      >
        {children}
      </ScrollLink>
    );
  }

  return (
    <RouterLink to={to} onClick={handleClick} className={className} {...props}>
      {children}
    </RouterLink>
  );
};
