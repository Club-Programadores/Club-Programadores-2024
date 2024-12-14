
import ProyectosDBContext from './proyectosDBContext'


export default class ProyectosController {

    // SYNCHRONOUS

    static obtenerProyectos = function () {
        let resultado = {
            detalle: '',
            exitoso: false,
            datos: {
                proyectos: []
            }
        }

        try {
            const response = ProyectosDBContext.obtenerProyectos();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }
    static obtenerProyectosAdministrador = function () {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        try {
            const response = ProyectosDBContext.xxx();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }
    static crearProyecto = function () {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        try {
            const response = ProyectosDBContext.xxx();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }
    static actualizarProyecto = function () {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        try {
            const response = ProyectosDBContext.xxx();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }
    static borrarProyecto = function () {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        try {
            const response = ProyectosDBContext.xxx();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }
    static añadirParticipanteProyecto = function () {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        try {
            const response = ProyectosDBContext.xxx();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }
    static borrarParticipanteProyecto = function () {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        try {
            const response = ProyectosDBContext.xxx();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }
    static añadirAdministradorProyecto = function () {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        try {
            const response = ProyectosDBContext.xxx();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }
    static borrarAdministradorProyecto = function () {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        try {
            const response = ProyectosDBContext.xxx();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    // ASYNCHRONOUS

    static asyncObtenerProyectos = async function () {
        let resultado = {
            detalle: '',
            exitoso: false,
            datos: {
                proyectos: []
            }
        }

        try {
            const response = await ProyectosDBContext.asyncObtenerProyectos();

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
            
            let listaProyectos = [];
            response.proyectos.forEach(proyecto => {
                listaProyectos.push({
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
            resultado.datos.proyectos = listaProyectos;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    static asyncObtenerProyectosAdministrador = async function (tokenSesion) {
        let resultado = {
            detalle: '',
            exitoso: false,
            datos: {
                proyectos: []
            }
        }

        try {
            const response = await ProyectosDBContext.asyncObtenerProyectosAdministrador(tokenSesion);
            console.log(response)

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
            const proyectos = response.proyectos_admin.map(proyecto => {
                proyecto.permite_sumarse = proyecto.permite_sumarse?'true':'false'
                return proyecto;
            })
            resultado.datos.proyectos = proyectos;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    static asyncCrearProyecto = async function (tokenSesion, formData) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }
        const backFormData = new FormData();
        backFormData.append("titulo", formData.titulo);
        backFormData.append("descripcion", formData.descripcion);
        backFormData.append("url_deploy", formData.url_pagina);
        backFormData.append("url_repository", formData.url_proyecto);
        backFormData.append("estado", formData.estado);
        backFormData.append("tecnologias", formData.tecnologias);
        backFormData.append("permite_sumarse", formData.permite_sumarse?1:0);

        try {
            const response = await ProyectosDBContext.asyncCrearProyecto(tokenSesion,backFormData);

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    static asyncActualizarProyecto = async function (tokenSesion,proyecto) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }
        
        const formData = new FormData();
        formData.append("proyecto_id", proyecto.id);
        formData.append("titulo", proyecto.titulo);
        formData.append("descripcion", proyecto.descripcion);
        formData.append("url_deploy", proyecto.url_deploy);
        formData.append("url_repository", proyecto.url_repository);
        formData.append("estado", proyecto.estado);
        formData.append("permite_sumarse", proyecto.permite_sumarse=='true'?1:0);
        formData.append("tecnologias", proyecto.tecnologias);

        try {
            const response = await ProyectosDBContext.asyncActualizarProyecto(tokenSesion,formData);
            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    static asyncBorrarProyecto = async function (tokenSesion,proyecto_id) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        const formData = new FormData();
        formData.append("proyecto_id", proyecto_id);

        try {
            const response = await ProyectosDBContext.asyncBorrarProyecto(tokenSesion,formData);

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    static asyncSumarseProyecto = async function (tokenSesion,proyecto_id) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        const formData = new FormData();
        formData.append("proyecto_id", proyecto_id);

        try {
            const response = await ProyectosDBContext.asyncSumarseProyecto(tokenSesion,formData);

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    static asyncAñadirParticipanteProyecto = async function (tokenSesion) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }
        console.log(2)

        const backFormData = new FormData();
        backFormData.append("titulo", formData.titulo);

        try {
            const response = await ProyectosDBContext.asyncAñadirParticipanteProyecto(tokenSesion);

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    static asyncBorrarParticipanteProyecto = async function (tokenSesion,proyecto_id,participante_id) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        const formData = new FormData();
        formData.append("proyecto_id", proyecto_id);
        formData.append("participante", participante_id);
        

        try {
            const response = await ProyectosDBContext.asyncBorrarParticipanteProyecto(tokenSesion,formData);

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    static asyncAñadirAdministradorProyecto = async function (tokenSesion,proyecto_id,participante_id) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        const formData = new FormData();
        formData.append("proyecto_id", proyecto_id);
        formData.append("is_admin", participante_id);

        try {
            const response = await ProyectosDBContext.asyncCambiarPermisoAdministradorProyecto(tokenSesion,formData);

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

    static asyncBorrarAdministradorProyecto = async function (tokenSesion,proyecto_id,participante_id) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        const formData = new FormData();
        formData.append("proyecto_id", proyecto_id);
        formData.append("is_participante", participante_id);

        try {
            const response = await ProyectosDBContext.asyncCambiarPermisoAdministradorProyecto(tokenSesion,formData);

            resultado.detalle = response.mensaje;
            resultado.exitoso = true;
        }
        catch (e) {
            resultado.detalle = e;
        }
        finally {
            return resultado;
        }
    }

}