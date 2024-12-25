
import Secrets from "@/../private/secrets.json"

export default class userDBContext {

  static asyncLoginUsuario = async function (formData) {
    const response = await fetch(`${Secrets.ApiUrl}/login`, {
      method: 'POST',
      headers: {
        "Accept": "*/*"
      },
      body: formData
    })

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
    }

    return responseJson;
  }

  static asyncRegistrarUsuario = async function (formData) {
    const response = await fetch(`${Secrets.ApiUrl}/registrar`, {
      method: 'POST',
      headers: {
        "Accept": "*/*"
      },
      body: formData
    });

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
    }

    return responseJson;
  }

  static asyncGetUsuario = async function (token) {
    const response = await fetch(`${Secrets.ApiUrl}/usuario`, {
      method: 'GET',
      headers: {
        "Accept": "*/*",
        "Authorization": token
      }
    })

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
    }

    return responseJson;
  }

  static asyncUpdateUserInfo = async function (token,formData) {
    const response = await fetch(`${Secrets.ApiUrl}/usuario`, {
      method: 'PUT',
      headers: {
        "Accept": "*/*",
        "Authorization": token
      },
      body: formData
    })

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
    }

    return responseJson;
  }

  static asyncUpdateUserPassword = async function (token,formData) {
    const response = await fetch(`${Secrets.ApiUrl}/actualizar_password`, {
      method: 'PUT',
      headers: {
        "Accept": "*/*",
        "Authorization": token
      },
      body: formData
    })

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
    }

    return responseJson;
  }

  static asyncRetrieveUserPass_Validation = async function (formData){
    const response = await fetch(`${Secrets.ApiUrl}/recuperar_contra/validacion`, {
      method: 'POST',
      headers: {
        "Accept": "*/*",
      },
      body: formData
    })

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
    }

    return responseJson;
  }

  static asyncRetrieveUserPass_Update = async function (formData){
    const response = await fetch(`${Secrets.ApiUrl}/recuperar_contra/cambio`, {
      method: 'PUT',
      headers: {
        "Accept": "*/*"
      },
      body: formData
    })
    
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
    }

    return responseJson;
  }
}

