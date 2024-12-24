import userDBContext from './userDBContext'


export default class UserController {

  static asyncLoginUser = async function (loginInput) {
    let resultado = {
      successful: false,
      details: '',
      tokenSesion: '',
      userInfo: {}
    }

    const backFormData = new FormData();
    backFormData.append("email", loginInput.email);
    backFormData.append("password", loginInput.password);

    try {
      const response = await userDBContext.asyncLoginUsuario(backFormData);

      resultado.successful = true;
      resultado.details = response.mensaje;
      resultado.tokenSesion = response.token;
      resultado.userInfo = {
        name: `${response.datos.nombre} ${response.datos.apellido}`,
        image: response.datos.imagenBase64,
      }
    }
    catch (e) {
      resultado.details = e;
    }
    finally {
      return resultado;
    }
  }

  static asyncRegisterUser = async function (formData) {
    let result = {
      successful: false,
      details: '',
      tokenSesion: '',
      userData: {}
    }

    const backFormData = new FormData();
    backFormData.append("email", formData.email);
    backFormData.append("image", formData.image);
    backFormData.append("nombre", formData.firstName);
    backFormData.append("apellido", formData.lastName);
    backFormData.append("github", formData.github);
    backFormData.append("password", formData.password);
    backFormData.append("informacion_adicional", formData.bio);
    backFormData.append("perfiles", formData.profile);
    backFormData.append("tecnologias", formData.technology);

    try {
      const response = await userDBContext.asyncRegistrarUsuario(backFormData);

      result.details = response.mensaje;
      result.successful = true;
      result.tokenSesion = response.token;
      result.userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        image: formData.image,
      }
    }
    catch (e) {
      result.details = e;
    }
    finally {
      return result;
    }
  }

  static asyncGetUsuario = async function (token) {
    let result = {
      successful: false,
      details: "",
      data: {},
    }

    try{
      const response = await userDBContext.asyncGetUsuario(token);
      result.successful = true;
      result.details = response.mensaje;
      result.data = response.datos;
    }
    catch(e){
      result.details = e;
    }
    finally{
      return result;
    }
  }

  static asyncUpdateUserInfo = async function (token, formData) {
    let result = {
      successful: false,
      details: "",
    }

    const backFormData = new FormData();
    backFormData.append("nombre", formData.firstName);
    backFormData.append("apellido", formData.lastName);
    backFormData.append("email", formData.email);
    backFormData.append("image", formData.image);
    backFormData.append("github", formData.github);
    backFormData.append("informacion_adicional", formData.bio);
    backFormData.append("perfiles", formData.profile);
    backFormData.append("tecnologias", formData.technology);

    try{
      const response = await userDBContext.asyncUpdateUserInfo(token,backFormData);
      result.successful = true;
      result.details = response.mensaje;
    }
    catch(e){
      result.details = e;
    }
    finally{
      return result;
    }
  }

  static asyncUpdateUserPassword = async function (token,newPass){
    let result = {
      successful: false,
      details: ""
    }

    const backFormData = new FormData();
    backFormData.append("password", newPass);

    try{
      const response = await userDBContext.asyncUpdateUserPassword(token,backFormData);
      result.successful = true;
      result.details = response.mensaje;
    }
    catch(e){
      result.details = e;
    }
    finally{
      return result;
    }
  }

  static asyncRetrieveUserPass_Validation = async function (correo){
    let result = {
      successful: false,
      details: ""
    }

    const backFormData = new FormData();
    backFormData.append("email", correo);

    try{
      const response = await userDBContext.asyncRetrieveUserPass_Validation(backFormData);
      result.successful = true;
      result.details = response.mensaje;
    }
    catch(e){
      result.details = e;
    }
    finally{
      return result;
    }
  }
  
  static asyncRetrieveUserPass_Update = async function (token,newPass){
    let result = {
      successful: false,
      details: ""
    }

    const backFormData = new FormData();
    backFormData.append("token_id", token);
    backFormData.append("password", newPass);

    try{
      const response = await userDBContext.asyncRetrieveUserPass_Update(backFormData);
      result.successful = true;
      result.details = response.mensaje;
    }
    catch(e){
      result.details = e;
    }
    finally{
      return result;
    }
  }
}

