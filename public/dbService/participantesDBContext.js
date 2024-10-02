
import Secrets from "@/../private/secrets.json"
import { get } from "react-scroll/modules/mixins/scroller";

export default class ParticipantesDBContext {

  static registrarUsuario = async function (formData) {

    let response;
    try{
      fetch(`${Secrets.ApiUrl}/registrar`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: formData
      })
      .then(response => response.json())
    }
    catch(e){
      resultado.estado = e;
      console.log('Error:', e)
      return resultado;
    }

    return response;
  }

  static asyncLoginUsuario = async function (datosUsuario) {
    const userMail = datosUsuario.mail;
    const hashPass = datosUsuario.pass.toHash();
    const apiCallUrl = `${Secrets.ApiUrl}/login?mail:${userMail},pass:${hashPass}`;

    const response = await fetch(apiCallUrl)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  }

  static asyncRegistrarUsuario = async function (formData) {

    let response;
    try{
      await fetch(`${Secrets.ApiUrl}/registrar`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: formData
      })
      .then(response => response.json())
    }
    catch(e){
      resultado.estado = e;
      console.log('Error:', e)
      return resultado;
    }

    return response;
  }

  static asyncGetAllParticipantes = async function () {
    const response = await fetch(`${Secrets.ApiUrl}/usuarios`,{
      method: 'get',
      head: {
        'Autorization': token
      },
      body: ''
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.usuarios;
  }

  static asyncGetParticipante = async function (token, id) {
    throw Error('Not Implemented')
  }

  static asyncGetUsuarioParticipante = async function (token, id) {
    throw Error('Not Implemented')
  }

  static AsyncGetInformacionParticipante = async function (token, id) {
    throw Error('Not Implemented')
  }

  static AsyncGetPerfilParticipante = async function (token, id) {
    throw Error('Not Implemented')
  }
  static AsyncGetTecnologiasParticipante = async function (token, id) {
    throw Error('Not Implemented')
  }
}

