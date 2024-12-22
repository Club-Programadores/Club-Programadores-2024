
import Secrets from "@/../private/secrets.json"

export default class ParticipantesDBContext {

// synchronous

  static loginUsuario = function (loginInput) {
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

  static getUsuario = function (token) {
    const response = fetch(`${Secrets.ApiUrl}/usuario`, {
      method: 'GET',
      headers: {
        "Accept": "*/*",
        "Authorization": token
      }
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response.json();
    return responseJson;
  }

  static updateUsuario = function (token,formData) {
    const response = fetch(`${Secrets.ApiUrl}/usuario`, {
      method: 'PUT',
      headers: {
        "Accept": "*/*",
        "Authorization": token
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response.json();
    return responseJson;
  }

  static updateUserPassword = function (token,formData) {
    console.log(token)
    const response = fetch(`${Secrets.ApiUrl}/actualizar_password`, {
      method: 'PUT',
      headers: {
        "Accept": "*/*",
        "Authorization": token
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response.json();
    return responseJson;
  }

  static retrieveUserPass = function (formData){
    const response = fetch(`${Secrets.ApiUrl}/recuperar_password`, {
      method: 'POST',
      headers: {
        "Accept": "*/*",
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response.json();
    return responseJson;
  }
  
// asynchronous

  static asyncLoginUsuario = async function (formData) {
    const response = await fetch(`${Secrets.ApiUrl}/login`, {
      method: 'POST',
      headers: {
        "Accept": "*/*"
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response.json();
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

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    
    
    const responseJson = response.json();
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

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response.json();
    return responseJson;
  }

  static asyncUpdateUsuario = async function (token,formData) {
    const response = await fetch(`${Secrets.ApiUrl}/usuario`, {
      method: 'PUT',
      headers: {
        "Accept": "*/*",
        "Authorization": token
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response.json();
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

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response.json();
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

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = response.json();
    return responseJson;
  }

  static asyncRetrieveUserPass_Update = async function (formData){
    const response = await fetch(`${Secrets.ApiUrl}/recuperar_contra/validacion`, {
      method: 'PUT',
      headers: {
        "Accept": "*/*"
      },
      body: formData
    })
    
    const responseJson = await response.json();
    responseJson.status = response.status
    responseJson.ok = response.ok

    return responseJson;
  }
}

