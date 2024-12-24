
import Secrets from "@/../private/secrets.json"

export default class ParticipantsDBContext {

  static asyncGetAllParticipants = async function () {
    const response = await fetch(`${Secrets.ApiUrl}/usuarios`)

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${responseJson.mensaje}`);
    }

    return responseJson;
  }
}

