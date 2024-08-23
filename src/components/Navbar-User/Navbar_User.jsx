import React, { useState } from "react";
import { CustomLink } from "../CustomLink";
import "./Navbar_User.css";

export default function Navbar_User({ logOutCallback }) {
  const navLinks = document.querySelectorAll(".nav-link");
  const collapseElement = document.getElementById("navbar-toggler");
  const [isShowingUserOptions, setShowingUserOptions] = useState(false);

  function closeCollapse() {
    collapseElement.classList.toggle("show");
  }

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", closeCollapse);
  });

  function toggleUserOptionsMenu() {
    if (isShowingUserOptions) {
      setShowingUserOptions(false);
    } else {
      setShowingUserOptions(true);
    }
  }

  return (
    <div className="header">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
        id="navbar"
      >
        <div className="container-fluid" id="navbar-container">
          <CustomLink to="/" className="logo-container nav-link">
            <img
              src="/assets/imgs/brand/Club de Programadors Inverted Color Transparent bg.svg"
              alt="Club de Programador@es"
              id="logo"
            />
          </CustomLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-toggler"
            aria-controls="navbar-toggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-toggler">
            <div className="navbar-nav prevent-select me-auto mb-2 mb-lg-0">
              <CustomLink to="/" className="nav-link">
                Inicio
              </CustomLink>
              <CustomLink to="/about-us" className="nav-link">
                Acerca de
              </CustomLink>
              <CustomLink to="/contact-us" className="nav-link">
                Contacto
              </CustomLink>
              <CustomLink
                to="/participantes"
                className="nav-link"
                href="participantes"
              >
                Participantes
              </CustomLink>
              <CustomLink to="/proyectos" className="nav-link" href="proyectos">
                Proyectos
              </CustomLink>
            </div>

            <div
              className="navbar-nav m-ms-auto buttons-container prevent-select user"
              onClick={toggleUserOptionsMenu}
            >
              <p>Nombre Apellido</p>
              <img src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg" />
            </div>
          </div>

          <div className="user_options prevent-select">
            {isShowingUserOptions ? (
              <>
                <p>Modificar Usuario</p>
                <hr />
                <p onClick={logOutCallback}>Cerrar Sesion</p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
