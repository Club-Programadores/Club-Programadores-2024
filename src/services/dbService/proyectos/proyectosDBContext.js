
import Secrets from "@/../private/secrets.json"

export default class ProyectosDBContext {

    // SYNCHRONOUS

    static obtenerProyectos = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static obtenerProyectosAdministrador = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static crearProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static actualizarProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static borrarProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static añadirParticipanteProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static borrarParticipanteProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static añadirAdministradorProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static borrarAdministradorProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    

    // ASYNCHRONOUS

    static asyncObtenerProyectos = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncObtenerProyectosAdministrador = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncCrearProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncActualizarProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncBorrarProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncAñadirParticipanteProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncBorrarParticipanteProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncAñadirAdministradorProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
    static asyncBorrarAdministradorProyecto = function () {
        const response = fetch(`${Secrets.ApiUrl}/endpoint`)

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = response.json();
        return responseData;
    }
    
}