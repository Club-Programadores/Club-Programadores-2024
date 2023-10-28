import SignUp from '../buttons/SignUp';
import './Navbar.css'

function Navbar(){
    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand py-0 me-0" href="#">
                    <div class="logo-container">
                        <img src="/assets/imgs/brand/Club de Programadors Inverted Color Transparent bg.svg" alt="Club de Programador@es" id="logo"/>
                    </div>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggler" aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbar-toggler">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Acerca de</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Proyectos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Skills</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contacto</a>
                    </li>
                    </ul>

                    <div class="navbar-nav m-ms-auto buttons-container">
                        <SignUp />
                        {/* <button class="btn btn-outline-success my-2 my-sm-0">Sumate!</button> */}
                        <button class="btn btn-outline-secondary my-2 my-sm-0">Login</button>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;