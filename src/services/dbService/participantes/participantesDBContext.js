
import Secrets from "@/../private/secrets.json"

export default class ParticipantesDBContext {

  static getAllParticipantes = function () {
    const response = fetch(`${Secrets.ApiUrl}/usuarios`)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseData = response.json();
    return responseData.usuarios;
  }

  static asyncGetAllParticipantes = async function () {
    const response = await fetch(`${Secrets.ApiUrl}/usuarios`)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.usuarios;
  }
}

