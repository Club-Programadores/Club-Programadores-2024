import React, { useState } from "react";
import "./SignInModal.css";

const SignInModal = ({ loggedInCallback, onClose }) => {
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [showIncorrectUserMsg, setShowIncorrectUserMsg] = useState(false);

  const testUserMail = "a@b.com";
  const testUserPass = "1234";

  const isCredentialsValid = () => {
    return userMail === testUserMail && userPass === testUserPass;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isCredentialsValid()) {
      setShowIncorrectUserMsg(true);
    } else {
      if (typeof loggedInCallback === "function") {
        loggedInCallback();
      }
      onClose();
      console.log("Logged In");
    }
  };

  return (
    <div className="modal modal-container d-flex" id="sign-up-modal">
      <div className="modal-dialog modal-dialog-centered form-container modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Iniciar sesión</h5>
            <button
              onClick={onClose}
              type="button"
              className="btn-close cursor-pointer"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body d-flex flex-column">
              <section className="d-flex flex-column">
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userMail}
                    onChange={(e) => setUserMail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={userPass}
                    onChange={(e) => setUserPass(e.target.value)}
                  />
                </div>
              </section>
              <section className="d-flex gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Mantener la sesión
                </label>
              </section>
            </div>

            {showIncorrectUserMsg && (
              <div class="login-error alert alert-danger" role="alert">
                Correo y/o contraseña incorrecta
              </div>
            )}

            <div className="modal-footer d-flex justify-content-center">
              <button type="submit" className="btn btn-success">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
