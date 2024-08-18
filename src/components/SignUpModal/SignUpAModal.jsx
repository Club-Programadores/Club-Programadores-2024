import React,{ useState } from "react";
import "./SignUpModals.css";

const SignUpAModal = ({ onClose, handleLoginRedirect, handleNext }) => {

  let userMail;
  let userPass;
  let userPass2;

  const [mostraRegistroRechazadoMsg, setMostrarRegistroRechazadoMsg] = useState(false);
  const [registroRechazadoMsg, setRegistroRechazadoMsg] = useState("");

  const correoYContraseñaValida = () =>{
    var re = /\S+@\S+\.\S+/;
    if(!userMail){
      setRegistroRechazadoMsg("El correo no puede estar vacio!");
      return false;
    }
    else if(!re.test(userMail)){
      setRegistroRechazadoMsg("Correo incorrecto!");
      return false;
    }
    else if(!userPass){
      setRegistroRechazadoMsg("La contraseña no puede estar vacia!");
      return false;
    }
    else if(userPass !== userPass2){
      setRegistroRechazadoMsg("Las contraseñas no coinciden!");
      return false;
    }

    return true;
  }


  const handleSubmit = (e) => {
    if(correoYContraseñaValida() == false){
      if(!mostraRegistroRechazadoMsg){
        setMostrarRegistroRechazadoMsg(true)
      }
      return -1;
    }

    handleNext({
      name: userMail,
      pass: userPass
    })
  };

  const onMailInputChange = (e) =>{
    userMail = e.target.value;
  }
  const onPassInputChange = (e) =>{
    userPass = e.target.value;
  }
  const onPass2InputChange = (e) =>{
    userPass2 = e.target.value;
  }

  return (
    <div className="modal modal-container d-flex" id="sign-up-modal">
      <div className="modal-dialog modal-dialog-centered form-container modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrarse</h5>
            <button
              onClick={onClose}
              type="button"
              className="btn-close cursor-pointer"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
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

                <div className="mb-3">
                  <label htmlFor="password">Confirmar constraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={onPass2InputChange}
                  />
                </div>
              </section>


            {
              mostraRegistroRechazadoMsg? 
                <div className="wrong_input">
                  <p>{registroRechazadoMsg}</p>
                </div>
                :<div/> // no mostrar cartel
            }

              <section className="d-flex justify-content-center">
                <div onClick={handleLoginRedirect} className="login-redirect">
                  Ya tengo una cuenta
                </div>
              </section>
            </div>

            <div className="modal-footer d-flex justify-content-center">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-success"
              >
                Siguiente
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpAModal;
