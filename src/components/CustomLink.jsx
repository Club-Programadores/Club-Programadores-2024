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
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          scroller.scrollTo("contactanos", { smooth, duration });
        }, 100);
      } else {
        scroller.scrollTo("contactanos", { smooth, duration });
      }
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
