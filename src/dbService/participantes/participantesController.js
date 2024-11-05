import ParticipantesDBContext from '../participantes/participantesDBContext'


export default class ParticipantesController {

  static getAllParticipantes = function () {
    const participantes = ParticipantesDBContext.getAllParticipantes();
    return participantesBack2Front(participantes);
  }

  static asyncGetAllParticipantes = async function () {
    const participantes = await ParticipantesDBContext.asyncGetAllParticipantes();
    return participantesBack2Front(participantes);
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
    "github": participanteBack.github,
    "profiles": participanteBack.perfiles,
    "technology": participanteBack.tecnologias
  }

  return participanteFront;
}

