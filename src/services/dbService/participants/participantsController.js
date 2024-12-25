import ParticipantsDBContext from './participantsDBContext'

const participantsBack2Front = function (listaParticipantesBack) {
  let listaParticipantesFront = [];
  listaParticipantesBack.forEach(participanteBack => {
    listaParticipantesFront.push(participantBack2Front(participanteBack))
  });
  return listaParticipantesFront;
}

const participantBack2Front = function (participanteBack) {
  const participanteFront = {
    "id": participanteBack.id,
    "nombre": participanteBack.nombre,
    "apellido": participanteBack.apellido,
    "bio": participanteBack.informacion,
    "imageUrl": participanteBack.image,
    "github": participanteBack.github,
    "profiles": participanteBack.perfiles,
    "technology": participanteBack.tecnologias
  }

  return participanteFront;
}

export default class ParticipantsController {

  static asyncGetAllParticipants = async function () {
    let result = {
      successful: false,
      details: "",
      participants: []
    }

    try{
      const response = await ParticipantsDBContext.asyncGetAllParticipants();
      result.successful = true;
      result.details = response.mensaje;
      result.participants = participantsBack2Front(response.usuarios);
    }
    catch(e){
      result.details = e;
    }

    return result;
  }
}

