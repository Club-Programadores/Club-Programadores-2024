
import Secrets from "@/../private/secrets.json"

export default class ProyectosDBContext {

    // SYNCHRONOUS

    static obtenerProyectos = function () {
        const response = fetch(`${Secrets.ApiUrl}/proyectos`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static obtenerProyectosAdministrador = function (tokenSesion) {
        const response = fetch(`${Secrets.ApiUrl}/proyectos_admin`,{
            method: 'GET',
            headers: {
              "Accept": "*/*",
              "Authorization": tokenSesion
            }
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static crearProyecto = function (tokenSesion,formData) {
        const response = fetch(`${Secrets.ApiUrl}/proyectos`, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static actualizarProyecto = function (tokenSesion, formData) {
        const response = fetch(`${Secrets.ApiUrl}/proyectos`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static borrarProyecto = function (tokenSesion, formData) {
        const response = fetch(`${Secrets.ApiUrl}/proyectos`, {
            method: 'DELETE',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static añadirParticipanteProyecto = function (tokenSesion, formData) {
        const response = fetch(`${Secrets.ApiUrl}/sumarse_proyecto`, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static borrarParticipanteProyecto = function (tokenSesion, formData) {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`, {
            method: 'DELETE',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static cambiarPermisoAdministradorProyecto = function (tokenSesion, formData) {
        const response = fetch(`${Secrets.ApiUrl}/cambiar_rol_proyecto`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    

    // ASYNCHRONOUS

    static asyncObtenerProyectos = async function () {
        const response = await fetch(`${Secrets.ApiUrl}/proyectos`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncObtenerProyectosAdministrador = async function (tokenSesion) {
        const response = await fetch(`${Secrets.ApiUrl}/proyectos_admin`,{
            method: 'GET',
            headers: {
              "Accept": "*/*",
              "Authorization": tokenSesion
            }
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const responseData = response.json();
        return responseData;
    }
    
    static asyncCrearProyecto = async function (tokenSesion,formData) {
        const response = await fetch(`${Secrets.ApiUrl}/proyectos`, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncActualizarProyecto = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/proyecto`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncBorrarProyecto = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/proyecto`, {
            method: 'DELETE',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncSumarseProyecto = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/sumarse_proyecto`, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }

    static asyncAñadirParticipanteProyecto = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/sumarse_proyecto`, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncBorrarParticipanteProyecto = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/salir_proyecto`, {
            method: 'DELETE',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncCambiarPermisoAdministradorProyecto = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/cambiar_rol_proyecto`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
          })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
}