import technologyNameToImageSource from "../../../public/tools/technologyNameToImageSource";
import "./ParticipanteBoxStyles.css";

export default function ParticipanteBox(participante) {
  const participanteImageUrl = () => {
    if (participante.data.imageUrl != "") {
      return participante.data.imageUrl;
    }
    return "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"; //Foto de perfil default
  };

  return (
    <div className="participanteBox container-sm row bg-info.bg-gradient">
      <div className="d-flex col-12 col-md-6">
        <div className="profilePic">
          <img src={participanteImageUrl()} />
        </div>
        <div className="participanteInfo">
          <h1>{participante.data.nombre}</h1>
          <div className="profiles">
            {participante.data.profiles.map((profiles) => {
              return <p>{profiles.toUpperCase()}</p>;
            })}
          </div>
        </div>
      </div>
      <div className="tecnologias flex-column col-12 col-md-6">
        <h3>TECNOLOGÍAS</h3>
        <div className="iconsContainer">
          {participante.data.technology.map((technology) => {
            return <img src={technologyNameToImageSource(technology.nombre)} />;
          })}
        </div>
      </div>
    </div>
  );
}
