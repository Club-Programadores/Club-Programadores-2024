import ParticipantesDBContext from './participantesDBContext.js'


export default class ParticipantesController {

  static loginParticipante = function (loginInput) {
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

  static registrarParticipante = function (formData) {
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

  static asyncLoginParticipante = async function (loginInput) {
    let resultado = {
      detalle: '',
      tokenSesion: '',
      datosValidos: false,
      informacionParticipante: {}
    }

    try {
      const response = await ParticipantesDBContext.asyncLoginUsuario(loginInput);
      console.log(response)

      resultado.detalle = response.mensaje;
      resultado.datosValidos = true;
      resultado.tokenSesion = response.token;
      resultado.informacionParticipante = {
        nombre: `${response.datos.nombre} ${response.datos.apellido}`,
        imagen: response.datos.imagen,
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

  static asyncRegistrarParticipante = async function (formData) {
    let resultado = {
      detalle: '',
      registroExitoso: false,
      datosUsuario: {}
    }
    console.log(formData)
    const backFormData = new FormData();
    backFormData.append("email", formData.email);
    backFormData.append("image", formData.image);//
    backFormData.append("nombre", formData.firstName);
    backFormData.append("apellido", formData.lastName);
    backFormData.append("password", formData.password);
    backFormData.append("informacion_adicional", formData.bio);
    backFormData.append("perfiles", formData.profile);
    backFormData.append("tecnologias", formData.technology);

    // const backFormData = {
    //   email: formData.email,
    //   image: formData.profilePicture,
    //   nombre: formData.firstName,
    //   apellido: formData.lastName,
    //   password: formData.password,
    //   informacion_adicional: formData.bio,
    //   perfiles: formData.profile,
    //   tecnologias: formData.technology
    // }

    try {
      const response = await ParticipantesDBContext.asyncRegistrarUsuario(backFormData);
      console.log(response)
      resultado.detalle = response.mensaje;
      resultado.registroExitoso = true;
      resultado.datosUsuario = {
        nombre: `${formData.firstName} ${formData.lastName}`,
        image: formData.image,
      }
    }
    catch (e) {
      resultado.detalle = e;
    }
    finally {
      return resultado;
    }
  }

  static asyncGetAllParticipantes = async function () {

    const participantes = await ParticipantesDBContext.asyncGetAllParticipantes();

    return participantesBack2Front(participantes);
  }

  static asyncGetParticipante = async function (token, id) {
    const participantes = await AsyncGetAllParticipantes(token);
    const participante = participantes.find(x => x.id = id)
    return participanteBack2Front(participante);
  }


}

const participantesBack2Front = function (listaParticipantesBack) {
  let listaParticipantesFront = [];
  listaParticipantesBack.forEach(participanteBack => {
    listaParticipantesFront.push(participanteBack2Front(participanteBack))
  });
  return listaParticipantesFront;
}

const participanteBack2Front = function (participanteBack) {
  const participanteFront = {
    "id": participanteBack.id,
    "nombre": participanteBack.nombre,
    "apellido": participanteBack.apellido,
    "bio": participanteBack.informacion,
    "imageUrl": participanteBack.image,
    "profiles": participanteBack.perfiles,
    "technology": participanteBack.tecnologias
  }

  return participanteFront;
}

