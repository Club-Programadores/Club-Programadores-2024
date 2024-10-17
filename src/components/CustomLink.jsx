import React from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink, scroller, animateScroll } from "react-scroll";

<<<<<<< HEAD
export const CustomLink = ({ to, children, smooth, ...props }) => {
=======
export const CustomLink = ({
  to,
  children,
  smooth = true,
  duration = 500,
  className,
  onClick,
  ...props
}) => {
>>>>>>> 314eb0e (Modal de perfil de usuario agregado, bugfixes varios)
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
<<<<<<< HEAD
      <ScrollLink to={to.slice(1)} smooth={smooth} {...props}>
=======
      <ScrollLink
        to="contactanos"
        smooth={smooth}
        duration={duration}
        className={className}
        {...props}
      >
>>>>>>> 314eb0e (Modal de perfil de usuario agregado, bugfixes varios)
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
