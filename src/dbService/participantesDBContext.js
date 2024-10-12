
import Secrets from "@/../private/secrets.json"

export default class ParticipantesDBContext {

  static loginUsuario = function (loginInput) {
    console.log(loginInput);
    const response = fetch(`${Secrets.ApiUrl}/login`, {
      method: 'POST',
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
      },
      body: {
        "email": loginInput.email,
        "password": loginInput.pass
      }
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response => response.json();
    return responseJson;
  }

  static registrarUsuario = function (formData) {
    const response = fetch(`${Secrets.ApiUrl}/registrar`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: formData
    }).then(response => response.json())

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response;
  }

  static asyncLoginUsuario = async function (loginInput) {
    const response = await fetch(`${Secrets.ApiUrl}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: {
        email: loginInput.email,
        password: loginInput.pass
      }
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response => response.json();
    return responseJson;
  }

  static asyncRegistrarUsuario = async function (formData) {
    console.log(formData);
    const response = await fetch(`${Secrets.ApiUrl}/registrar`, {
      method: 'POST',
      headers: {
        // ,'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
      },
      body: formData
    }).then(response => response.json())
    console.log(response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response;
  }

  static asyncGetAllParticipantes = async function () {
    const response = await fetch(`${Secrets.ApiUrl}/usuarios`)

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

