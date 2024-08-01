import "./About.css";

function About() {
  return (
    <div id="about-us">
      <div id="about-container">
        <div className="about-container justify-content-center gap-3 my-5 d-flex flex-column text-center">
          <h2>
            El Club de programadores del CUVL es un espacio para conectar,
            colaborar y aprender programación a tu ritmo
          </h2>
          <h2 className="text-secondary">
            Funciona los sábados de 10 a 12 hs. en el Centro Universitario
          </h2>
        </div>
        <div className="row-wrapper">
          <div className="row squares-container justify-content-center">
            <div className="d-flex flex-column square-container justify-content-between col-10 col-md-4 text-center align-items-center my-4">
              <div
                className="circle d-flex justify-content-center"
                id="about-circle-1"
              >
                <img src="../../../assets/002-profile.svg" alt="" />
              </div>
              <div className="h-50">
                <h3>Creá tu perfil</h3>
              </div>
            </div>

            <div className="d-flex flex-column square-container justify-content-between col-10 col-md-4 text-center align-items-center my-4">
              <div
                className="circle d-flex justify-content-center"
                id="about-circle-2"
              >
                <img src="../../../assets/004-competence.svg" alt="" />
              </div>
              <div className="h-50">
                <h3>Cargá tus skills, proyectos e intereses</h3>
              </div>
            </div>

            <div className="d-flex flex-column square-container justify-content-between col-10 col-md-4 text-center my-4">
              <div className="circle" id="about-circle-3"></div>
              <div className="h-50">
                <h3 className="">Conectá con otr@s y potenciá tu desarrollo</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
