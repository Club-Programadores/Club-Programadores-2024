import React,{ useState } from "react";

import "./SignInModal.css"

/*
BUG: userPass pasa a undefined la primera vez que se hace click en Entrar. 
De estar bien la contraseña y corregirse el correo no va a permitir ingresar. Se soluciona modificando la contraseña y borrando el cambio.
*/

const SignInModal = ({loggedInCallback, onClose }) => {

  let userMail;
  let userPass;

  const testUserMail = "a@b.com"
  const testUserPass = 1234

  const [mostraUsuarioIncorrectoMsg, setMostarUsuarioIncorrectoMsg] = useState(false);

  const correoYContraseñaValido = () =>{
    if(userMail == testUserMail && userPass == testUserPass){
      return true
    }
    else{
      return false
    }
  }

  const handleSubmit = (e) => {
    if(correoYContraseñaValido() == false){
      if(!mostraUsuarioIncorrectoMsg){
        setMostarUsuarioIncorrectoMsg(true)
      }
    }
    else{
      e.preventDefault();
  
      loggedInCallback();
      onClose();
      console.log("Logged In");
    }
  };
  
  const onMailInputChange = (e) =>{
    userMail = e.target.value;
  }
  const onPassInputChange = (e) =>{
    userPass = e.target.value;
  }

  return (
    <div className="modal modal-container d-flex" id="sign-up-modal">
      <div className="modal-dialog modal-dialog-centered form-container modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Iniciar sesión</h5>
            <button // X Button
              onClick={onClose}
              type="button"
              className="btn-close cursor-pointer"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
                    onChange={onMailInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password">Constraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={onPassInputChange}
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
                <label className="form-check-label" for="flexCheckDefault">
                  Mantener la sesión
                </label>
              </section>
            </div>

            {
              mostraUsuarioIncorrectoMsg? 
                <div className="wrong_input">
                  <p>correo y/o contraseña incorrecta</p>
                </div>
                :<div/> // no mostrar cartel
            }

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
