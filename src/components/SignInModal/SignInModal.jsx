import React,{useCallback, useEffect, useState } from "react";
import Secrets from "../../../private/secrets.json"

import "./SignInModal.css"

const SignInModal = ({loggedInCallback, onClose }) => {
  const apiUrl = `${Secrets.ApiUrl}/usuarios`

  const [mostraUsuarioIncorrectoMsg, setMostarUsuarioIncorrectoMsg] = useState(false);
  const [userEmailInput, setUserEmailInput] = useState("");
  const [userPassInput, setUserPassInput] = useState("");
  
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    email: ""
  });

  const [datosLoginValidos, setDatosLoginValidos] = useState(false);
  let tempUserEmailInput = userEmailInput;
  let tempUserPassInput = userPassInput;

  const fetchData = useCallback(async () => { 
    try{   

      const apiCallUrl = `${apiUrl}?email=${tempUserEmailInput}`;
      const  response = await fetch(apiCallUrl);

      const responseData = await response.json();
      const userData = await responseData.usuarios[0];

      console.log(2)
      console.log(`${userData.password} != ${tempUserPassInput}`)
      if(userData.password != tempUserPassInput){
        setDatosLoginValidos(false);
      }
      else{
        setDatosUsuario({
          nombre: `${userData.nombre} ${userData.apellido}`,
          email: userData.email
        })
        
        setDatosLoginValidos(true);
      }
    }
    catch(error){
      console.log(error)
    }

    setUserEmailInput(tempUserEmailInput);
    setUserPassInput(tempUserPassInput);
  })
  
  useEffect(()=>{
    fetchData();
  }, [apiUrl, fetchData])

  const handleSubmit = (e) => {
    console.log(datosLoginValidos)
    if(datosLoginValidos){
      loggedInCallback(datosUsuario);
  
      onClose();
    }
    else{
      if(!mostraUsuarioIncorrectoMsg){
        setMostarUsuarioIncorrectoMsg(true)
      }
    }
  };
  
  const onMailInputChange = (e) =>{
    tempUserEmailInput = e.target.value;
    // setUserEmailInput(e.target.value);
    fetchData();
  }
  const onPassInputChange = (e) =>{
    tempUserPassInput = e.target.value;
    // setUserPassInput(e.target.value);
    fetchData();
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
              <button onClick={handleSubmit} className="btn btn-success">
                Entrar
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
