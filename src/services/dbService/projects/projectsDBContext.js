
import Secrets from "@/../private/secrets.json"

export default class ProjectsDBContext {
    
    static asyncGetProjects = async function () {
        const response = await fetch(`${Secrets.ApiUrl}/proyectos`)

        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
        }

        return responseJson;
    }

    static asyncGetAdminProjects = async function (tokenSesion) {
        const response = await fetch(`${Secrets.ApiUrl}/proyectos_admin`, {
            method: 'GET',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            }
        })

        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
        }

        return responseJson;
    }

    static asyncCreateProject = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/proyectos`, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
        })

        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
        }

        return responseJson;
    }

    static asyncEditProject = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/proyecto`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
        })

        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
        }

        return responseJson;
    }

    static asyncDeleteProject = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/proyecto`, {
            method: 'DELETE',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
        })

        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
        }

        return responseJson;
    }

    static asyncJoinProject = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/sumarse_proyecto`, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
        })

        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
        }

        return responseJson;
    }

    static asyncRemoveParticipantFromProject = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/salir_proyecto`, {
            method: 'DELETE',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
            },
            body: formData
        })

        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
        }

        return responseJson;
    }

    static asyncAddAdminToProject = async function (tokenSesion, formData) {
        const response = await fetch(`${Secrets.ApiUrl}/cambiar_rol_proyecto`, {
            method: 'PUT',
            headers: {
                "Accept": "*/*",
                "Authorization": tokenSesion
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