import "./About.css"

function About() {
  return (
    <div id='about-us'>
        <div id='about-container'>
          <div className="about-container m-5 d-flex flex-column text-center">
            <h2>El Club de programadores del CUVL es un espacio para conectar, colaborar y aprender programación a tu ritmo</h2>
            <h3>Funciona los sábados de 10 a 12 hs. en el Centro Universitario</h3>
          </div>
          <div className="row-wrapper">
            <div className="row squares-container justify-content-center">
              <div className="square-container justify-content-center col-10 col-md-4">
                <div className="circle d-flex justify-content-center" id="about-circle-1">
                  <img src="../../../assets/002-profile.svg" alt="" />
                </div>
              </div>
              <div className="square-container col-10 col-md-4">
                <div className="circle d-flex justify-content-center" id="about-circle-2">
                  <img src="../../../assets/004-competence.svg" alt="" />
                </div>
              </div>
              <div className="square-container col-10 col-md-4">
                <div className="circle d-flex justify-content-center" id="about-circle-3">
                  <img src="../../../assets/005-teamwork.svg" alt="" />
                      
                </div>
              </div>

            </div>

          </div>
        </div>
    </div>
  )
}

export default About
