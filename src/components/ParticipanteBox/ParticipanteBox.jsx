import Interes from "..//Intereses//interes";
import skillNameToImageSource from "../../../public/tools/SkillNameToImageSource";
import "./ParticipanteBoxStyles.css";

export default function ParticipanteBox(participante) {
  const participanteImageUrl = () => {
    if (participante.data.imageUrl != "") {
      return participante.data.imageUrl;
    }
    //Default participante image
    return "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
  };

  return (
    <div className="participanteBox container-sm row bg-info.bg-gradient">
      <div className="d-flex col-12 col-md-6">
        <div className="profilePic">
          <img src={participanteImageUrl()} />
        </div>
        <div className="participanteInfo">
          <h1>{participante.data.nombre}</h1>
          <div className="intereses">
            {/* <h3>Perfil:</h3> */}
            {participante.data.intereses.map((interes) => {
              return <Interes data={interes.toUpperCase()}></Interes>;
            })}
          </div>
        </div>
      </div>
      <div className="tecnologias flex-column col-12 col-md-6">
        <h3>TECNOLOGÍAS</h3>
        <div className="iconsContainer">
          {participante.data.skills.map((skill) => {
            return <img src={skillNameToImageSource(skill.nombre)} />;
          })}
        </div>
      </div>
    </div>
  );
}
