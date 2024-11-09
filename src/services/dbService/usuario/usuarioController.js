import ParticipantesDBContext from './usuarioDBContext'


export default class ParticipantesController {

// synchronous

  static loginUsuario = function (loginInput) {
    let resultado = {
      detalle: '',
      tokenSesion: '',
      datosValidos: false,
      informacionParticipante: {}
    }

    try {
      console.log('a');
      const response = ParticipantesDBContext.loginUsuario(loginInput);
      console.log(response);

      resultado.detalle = response.mensaje;
      resultado.datosValidos = true;
      resultado.tokenSesion = response.token;
      resultado.informacionParticipante = {
        nombre: `${response.datos.nombre} ${response.datos.apellido}`,
        imagen: response.datos.imagen,
      }
    }
    catch (e) {
      resultado.detalle = e;
    }
    finally {
      return resultado;
    }
  }

  static registrarUsuario = function (formData) {
    let resultado = {
      detalle: '',
      registroExitoso: false,
      datosUsuario: {}
    }

    const backFormData = {
      email: formData.email,
      imagen: formData.profilePicture,
      nombre: formData.firstName,
      apellido: formData.lastName,
      password: formData.password,
      informacion_adicional: formData.bio,
      perfiles: formData.profile,
      tecnologias: formData.technology
    }
    console.log(backFormData)

    try {
      const response = ParticipantesDBContext.asyncRegistrarUsuario(backFormData);
      console.log(response)
      resultado.detalle = response.mensaje;
      resultado.registroExitoso = true;
      resultado.datosUsuario = {
        nombre: `${formData.firstName} ${formData.lastName}`,
        imagen: formData.imagen,
      }
    }
    catch (e) {
      resultado.detalle = e;
    }
    finally {
      return resultado;
    }
  }

  static getUsuario = function (token) {
    let resultado = {
      data: {},
      detalle: "",
      exitoso: false
    }
    try{
      const response = ParticipantesDBContext.getUsuario(token);
      resultado.exitoso = true;
      resultado.data = response.datos;
      resultado.detalle = response.mensaje;
    }
    catch(e){
      resultado.detalle = e;
    }
    finally{
      return resultado;
    }
  }

  static updateUsuario = function (token, data) {
    let resultado = {
      detalle: "",
      exitoso: false
    }

    try{
      const response = ParticipantesDBContext.updateUsuario(token,data);
      resultado.exitoso = true;
      resultado.detalle = response.mensaje;
    }
    catch(e){

    }
    finally{
      return resultado;
    }
  }

  static changePassword = function (token,password){
    let resultado = {
      detalle: "",
      exitoso: false
    }

    const formData = {
      password: password 
    }

    try{
      const response = ParticipantesDBContext.updatePassword(token,formData);
      resultado.exitoso = true;
      resultado.detalle = response.mensaje;
    }
    catch(e){

    }
    finally{
      return resultado;
    }
  } 

// asynchronous

  static asyncLoginUsuario = async function (loginInput) {
    let resultado = {
      detalle: '',
      tokenSesion: '',
      datosValidos: false,
      datosUsuario: {}
    }

    const backFormData = new FormData();
    backFormData.append("email", loginInput.email);
    backFormData.append("password", loginInput.password);

    try {
      const response = await ParticipantesDBContext.asyncLoginUsuario(backFormData);

      resultado.detalle = response.mensaje;
      resultado.datosValidos = true;
      resultado.tokenSesion = response.token;
      resultado.datosUsuario = {
        nombre: `${response.datos.nombre} ${response.datos.apellido}`,
        imagen: response.datos.imagenBase64,
      }
    }
    catch (e) {
      console.log(e)
      resultado.detalle = e;
    }
    finally {
      return resultado;
    }
  }

  static asyncRegistrarUsuario = async function (formData) {
    let resultado = {
      detalle: '',
      tokenSesion: '',
      registroExitoso: false,
      datosUsuario: {}
    }

    const backFormData = new FormData();
    backFormData.append("email", formData.email);
    backFormData.append("image", formData.image);
    backFormData.append("nombre", formData.firstName);
    backFormData.append("apellido", formData.lastName);
    backFormData.append("github", formData.github);
    backFormData.append("password", formData.password);
    backFormData.append("informacion_adicional", formData.bio);
    backFormData.append("perfiles[]", formData.profile);
    backFormData.append("tecnologias[]", formData.technology);

    try {
      const response = await ParticipantesDBContext.asyncRegistrarUsuario(backFormData);

      resultado.detalle = response.mensaje;
      resultado.registroExitoso = true;
      resultado.tokenSesion = response.token;
      resultado.datosUsuario = {
        nombre: `${formData.firstName} ${formData.lastName}`,
        imagen: formData.image,
      }
    }
    catch (e) {
      resultado.detalle = e;
    }
    finally {
      return resultado;
    }
  }

  static asyncGetUsuario = async function (token) {
    let resultado = {
      data: {},
      detalle: "",
      exitoso: false
    }
    try{
      const response = await ParticipantesDBContext.asyncGetUsuario(token);
      resultado.exitoso = true;
      resultado.data = response.datos;
      resultado.detalle = response.mensaje;
    }
    catch(e){
      resultado.detalle = e;
    }
    finally{
      return resultado;
    }
  }

  static asyncUpdateUsuario = async function (token, formData) {
    let resultado = {
      detalle: "",
      exitoso: false
    }

    const backFormData = new FormData();
    backFormData.append("nombre", formData.firstName);
    backFormData.append("apellido", formData.lastName);
    backFormData.append("email", formData.email);
    backFormData.append("image", formData.image);
    backFormData.append("github", formData.github);
    backFormData.append("informacion_adicional", formData.bio);
    backFormData.append("perfiles[]", formData.profile);
    backFormData.append("tecnologias[]", formData.technology);

    try{
      const response = await ParticipantesDBContext.asyncUpdateUsuario(token,backFormData);
      resultado.exitoso = true;
      resultado.detalle = response.mensaje;
    }
    catch(e){

    }
    finally{
      return resultado;
    }
  }

  static asyncChangePassword = async function (token,password){
    let resultado = {
      detalle: "",
      exitoso: false
    }

    const formData = {
      password: password 
    }

    try{
      const response = await ParticipantesDBContext.asyncUpdatePassword(token,formData);
      resultado.exitoso = true;
      resultado.detalle = response.mensaje;
    }
    catch(e){

    }
    finally{
      return resultado;
    }
  } 
}

