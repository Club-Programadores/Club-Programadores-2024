
import ProjectsDBContext from './projectsDBContext'


export default class ProjectsController {
    
    static asyncGetProjects = async function () {
        let result = {
            successful: false,
            details: '',
            data: {
                projects: []
            }
        }

        try {
            const response = await ProjectsDBContext.asyncGetProjects();

            result.successful = true;
            result.details = response.mensaje;

            let projectsList = [];
            response.proyectos.forEach(proyecto => {
                projectsList.push({
                    "id": proyecto.id,
                    "titulo": proyecto.titulo,
                    "descripcion": proyecto.descripcion,
                    "url_proyecto": proyecto.url_repository,
                    "url_pagina": proyecto.url_deploy,
                    "permite_sumarse": proyecto.permite_sumarse,
                    "tecnologias": proyecto.tecnologias,
                    "participantes": proyecto.participantes,
                    "estado": proyecto.estado,
                })
            });
            result.data.projects = projectsList;
        }
        catch (e) {
            result.details = e;
        }
        finally {
            return result;
        }
    }

    static asyncGetAdminProjects = async function (tokenSesion) {
        let result = {
            successful: false,
            details: '',
            data: {
                projects: []
            }
        }

        try {
            const response = await ProjectsDBContext.asyncGetAdminProjects(tokenSesion);

            result.successful = true;
            result.details = response.mensaje;
            const projects = response.proyectos_admin.map(proyecto => {
                proyecto.permite_sumarse = proyecto.permite_sumarse ? 'true' : 'false'
                return proyecto;
            })
            result.data.projects = projects;
        }
        catch (e) {
            result.details = e;
        }
        finally {
            return result;
        }
    }

    static asyncCreateProject = async function (tokenSesion, formData) {
        let result = {
            successful: false,
            details: '',
        }

        const backFormData = new FormData();
        backFormData.append("titulo", formData.titulo);
        backFormData.append("descripcion", formData.descripcion);
        backFormData.append("url_deploy", formData.url_pagina);
        backFormData.append("url_repository", formData.url_proyecto);
        backFormData.append("estado", formData.estado);
        backFormData.append("tecnologias", formData.tecnologias);
        backFormData.append("permite_sumarse", formData.permite_sumarse ? 1 : 0);

        try {
            const response = await ProjectsDBContext.asyncCreateProject(tokenSesion, backFormData);

            result.successful = true;
            result.details = response.mensaje;
        }
        catch (e) {
            result.details = e;
        }
        finally {
            return result;
        }
    }

    static asyncEditProject = async function (tokenSesion, project) {
        let result = {
            successful: false,
            details: '',
        }

        const formData = new FormData();
        formData.append("proyecto_id", project.id);
        formData.append("titulo", project.titulo);
        formData.append("descripcion", project.descripcion);
        formData.append("url_deploy", project.url_deploy);
        formData.append("url_repository", project.url_repository);
        formData.append("estado", project.estado);
        formData.append("permite_sumarse", project.permite_sumarse == 'true' ? 1 : 0);
        formData.append("tecnologias", project.tecnologias);

        try {
            const response = await ProjectsDBContext.asyncEditProject(tokenSesion, formData);
            result.successful = true;
            result.details = response.mensaje;
        }
        catch (e) {
            result.details = e;
        }
        finally {
            return result;
        }
    }

    static asyncDeleteProject = async function (tokenSesion, projectId) {
        let result = {
            successful: false,
            details: '',
        }

        const backFormData = new FormData();
        backFormData.append("proyecto_id", projectId);

        try {
            const response = await ProjectsDBContext.asyncDeleteProject(tokenSesion, backFormData);

            result.successful = true;
            result.details = response.mensaje;
        }
        catch (e) {
            result.details = e;
        }
        finally {
            return result;
        }
    }

    static asyncJoinProject = async function (tokenSesion, projectId) {
        let result = {
            successful: false,
            details: '',
        }

        const formData = new FormData();
        formData.append("proyecto_id", projectId);

        try {
            const response = await ProjectsDBContext.asyncJoinProject(tokenSesion, formData);

            result.successful = true;
            result.details = response.mensaje;
        }
        catch (e) {
            result.details = e;
        }
        finally {
            return result;
        }
    }

    static asyncRemoveParticipantFromProject = async function (tokenSesion, projectId, participantId) {
        let result = {
            successful: false,
            details: '',
        }

        const formData = new FormData();
        formData.append("proyecto_id", projectId);
        formData.append("participante", participantId);


        try {
            const response = await ProjectsDBContext.asyncRemoveParticipantFromProject(tokenSesion, formData);

            result.successful = true;
            result.details = response.mensaje;
        }
        catch (e) {
            result.details = e;
        }
        finally {
            return result;
        }
    }

    static asyncAddAdminToProject = async function (tokenSesion, projectId, participantId) {
        let result = {
            successful: false,
            details: '',
        }

        const backFormData = new FormData();
        backFormData.append("proyecto_id", projectId);
        backFormData.append("is_admin", participantId);

        try {
            const response = await ProjectsDBContext.asyncAddAdminToProject(tokenSesion, backFormData);

            result.successful = true;
            result.details = response.mensaje;
        }
        catch (e) {
            result.details = e;
        }
        finally {
            return result;
        }
    }

    static asyncRemoveAdminFromProject = async function (tokenSesion, projectId, participantId) {
        let result = {
            successful: false,
            details: '',
        }

        const backFormData = new FormData();
        backFormData.append("proyecto_id", projectId);
        backFormData.append("is_participante", participantId);

        try {
            const response = await ProjectsDBContext.asyncAddAdminToProject(tokenSesion, backFormData);

            result.successful = true;
            result.details = response.mensaje;
        }
        catch (e) {
            result.details = e;
        }
        finally {
            return result;
        }
    }
}