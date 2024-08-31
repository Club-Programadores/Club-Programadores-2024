import React,{useCallback, useEffect, useState } from "react";
import Secrets from "../../../private/secrets.json"

import "./SignUpModals.css";

const SignUpAModal = ({ onClose, handleLoginRedirect, handleNext }) => {
  const apiUrl = `${Secrets.ApiUrl}/usuarios`;
  
  const [mostraRegistroRechazadoMsg, setMostrarRegistroRechazadoMsg] = useState(false);
  const [registroRechazadoMsg, setRegistroRechazadoMsg] = useState("");
  const [correoYaRegistrado, setCorreoYaRegistrado] = useState(false);

  const [userEmailInput, setUserEmailInput] = useState("");
  const [userPassInput, setUserPassInput] = useState("");
  const [userPass2Input, setUserPass2Input] = useState("");
  let tempUserEmailInput = userEmailInput;
  let tempUserPassInput = userPassInput;
  let tempUserPass2Input = userPass2Input;


  const correoYContraseñaValida = () =>{
    var re = /\S+@\S+\.\S+/;
    if(!userEmailInput){
      setRegistroRechazadoMsg("El correo no puede estar vacio!");
      return false;
    }
    else if(!re.test(userEmailInput)){
      setRegistroRechazadoMsg("Formato del Correo incorrecto!");
      return false;
    }
    else if(!userPassInput){
      setRegistroRechazadoMsg("La contraseña no puede estar vacia!");
      return false;
    }
    else if(userPassInput !== userPass2Input){
      setRegistroRechazadoMsg("Las contraseñas no coinciden!");
      return false;
    }
    else if(correoYaRegistrado){
      setRegistroRechazadoMsg("El correo ingresado ya esta en uso!!");
      return false;
    }

    return true;
  }

  const fetchData = useCallback(async () => { 
    try{   
      const apiCallUrl = apiUrl+`?email=${tempUserEmailInput}`;
      const  response = await fetch(apiCallUrl);

      const responseData = await response.json();
      if(responseData.mensaje == 'Usuario no encontrado'){
        setCorreoYaRegistrado(false)
      }
      else{
        setCorreoYaRegistrado(true)
      }
    }
    catch(error){
      // console.log(error)
    }

    setUserEmailInput(tempUserEmailInput);
    setUserPassInput(tempUserPassInput);
    setUserPass2Input(tempUserPass2Input);
  })
  
  useEffect(()=>{
    fetchData();
  }, [apiUrl, fetchData])

  const handleSubmit = (e) => {
    if(correoYContraseñaValida() == false){
      if(!mostraRegistroRechazadoMsg){
        setMostrarRegistroRechazadoMsg(true)
      }
      return -1;
    }

    handleNext({
      email: userEmailInput,
      pass: userPassInput
    })
  };

  const onMailInputChange = (e) =>{
    tempUserEmailInput = e.target.value;
    fetchData();
  }
  const onPassInputChange = (e) =>{
    tempUserPassInput = e.target.value;
    fetchData();
  }
  const onPass2InputChange = (e) =>{
    tempUserPass2Input = e.target.value;
    fetchData();
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
