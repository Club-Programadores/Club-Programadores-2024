import SignUp from '../buttons/SignUp';
import './Navbar.css'

function Navbar(){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand py-0 me-0" href="#">
                    <div className="logo-container">
                        <img src="/assets/imgs/brand/Club de Programadors Inverted Color Transparent bg.svg" alt="Club de Programador@es" id="logo"/>
                    </div>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggler" aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-toggler">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Acerca de</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Proyectos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Skills</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contacto</a>
                    </li>
                    </ul>

                    <div className="navbar-nav m-ms-auto buttons-container">
                        <SignUp />
                        {/* <button className="btn btn-outline-success my-2 my-sm-0">Sumate!</button> */}
                        <button className="btn btn-outline-secondary my-2 my-sm-0">Login</button>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;