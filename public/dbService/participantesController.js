import ParticipantesDBContext from 'public/dbService/participantesDBContext.js'

const participantesBack2Front = function (listaParticipantesBack){
    let listaParticipantesFront = [];
    listaParticipantesBack.forEach(participanteBack => 
    {
      listaParticipantesFront.push(participanteBack2Front(participanteBack))
    });
    return listaParticipantesFront;
}

const participanteBack2Front = function (participanteBack){
      const participanteFront = {
        "id":participanteBack.id,
        "nombre": participanteBack.nombre,
        "apellido": participanteBack.apellido,
        "bio":participanteBack.informacion,
        "imageUrl": participanteBack.image,
        "profiles":participanteBack.perfiles,
        "technology": Object.keys(usuario.lenguaje_nivel).map(x => {
          return{
            "nombre": x.toLowerCase(),
            "nivel": 1
          }
        })
      }

    return participanteFront;
}

export default class ParticipantesController{

  static memoParticipantes = null;

  static asyncGetAllParticipantes = async function (){
      let participantes
      
      if(memoParticipantes){
        participantes = memoParticipantes;
      }
      else{
        participantes= await ParticipantesDBContext.AsyncGetAllParticipantes();
      }

      return participantesBack2Front(participantes);
  }

  static asyncGetParticipante = async function (token, id){
      const participantes = await AsyncGetAllParticipantes(token);
      const participante =  participantes.find(x => x.id = id)
      return participanteBack2Front(participante);
  }

  static asyncLoginParticipante = async function (loginInput){
    let resultado = {
      datosValidos: false,
      informacionParticipante: {}
    }

    let respose;
    try{
      respose = ParticipantesDBContext.LoginUsuario(loginInput);
    }
    catch(e){
     resultado.estado = e;
     return resultado;
    }

    if(response.status == 'logueado'){
      resultado.datosValidos = true;
      resultado.informacionParticipante = {
        nombre: respose.nombre,
        imagen: respose.imagen,
        token: response.token
      }
    }

    return resultado;
  }
  
  static asyncRegistrarParticipante = async function (datosUsuario){
    let resultado = {
      exitoso: true,
      detalle: ''
    }

    const formData = new FormData();
    formData.append('email', datosUsuario.email);
    formData.append('imagen', datosUsuario.imagen);
    formData.append('nombre', datosUsuario.nombre);
    formData.append('apellido', datosUsuario.apellido);
    formData.append('password', datosUsuario.password);
    formData.append('informacion_adicional', datosUsuario.informacion_adicional);
    formData.append('perfiles', datosUsuario.perfiles);
    formData.append('tecnologias', datosUsuario.tecnologias);

    let respose;
    try{
      respose = await ParticipantesDBContext.asyncRegistrarUsuario(datosUsuario);
    }
    catch(e){
      throw Error(e);
    }

    if(Response.status != 'logueado'){
      Response.status = 'fallido'
    }
    else{
      resultado.informacionParticipante = {
        nombre: respose.nombre,
        imagen: respose.imagen,
        token: response.token
      }
    }

    return resultado;
  }

}

