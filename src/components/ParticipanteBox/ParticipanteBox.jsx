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
    <div className="participanteBox container row">
      <div className="col-12 col-md-8" style={{ display: "flex" }}>
        <div className="profilePic">
          <img src={participanteImageUrl()} />
        </div>
        <div className="participanteInfo">
          <h1>{participante.data.nombre}</h1>
          <div className="intereses">
            <h3>Intereses:</h3>
            {participante.data.intereses.map((interes) => {
              return <Interes data={interes.toUpperCase()}></Interes>;
            })}
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4" style={{ paddingTop: "10px" }}>
        <h3 style={{ fontSize: "20px", margin: "0px" }}>SKILLS</h3>
        <div className="iconsContainer">
          {participante.data.skills.map((skill) => {
            return <img src={skillNameToImageSource(skill.nombre)} />;
          })}
        </div>
      </div>
    </div>
  );
}
