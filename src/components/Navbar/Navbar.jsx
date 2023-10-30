import SignUp from '../buttons/SignUp/SignUp';
import Login from '../buttons/Login/Login';
import {Link} from 'react-scroll';

import './Navbar.css';

export default function Navbar(){

    const navLinks = document.querySelectorAll('.nav-link');
    const collapseElement = document.getElementById('navbar-toggler');
    function closeCollapse(){
        if(collapseElement.classList.contains('show')){
            collapseElement.classList.toggle('show');
        }
    }

    navLinks.forEach(navLink => {
        navLink.addEventListener('click', closeCollapse);
    });

    return (
        <div className='header'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className='container-fluid' id='navbar-container'>
                <a className="navbar-brand py-0 me-0" href=".">
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
                        <a className="nav-link active" aria-current="page" href=".">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="participantes">Participantes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="proyectos">Proyectos</a>
                    </li>
                    </ul>

                    <div className="navbar-nav m-ms-auto buttons-container">
                        <SignUp />
                        <Login />
                    </div>
                </div>
            </div>
        </nav>
        </div>
    )
}

export function HomePageNavbar(){

    const navLinks = document.querySelectorAll('.nav-link');
    const collapseElement = document.getElementById('navbar-toggler');
    function closeCollapse(){
        if(collapseElement.classList.contains('show')){
            collapseElement.classList.toggle('show');
        }
    }

    navLinks.forEach(navLink => {
        navLink.addEventListener('click', closeCollapse);
    });

    return (
        <div className='header'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className='container-fluid' id='navbar-container'>
                <a className="navbar-brand py-0 me-0" href=".">
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
                        <Link 
                        to='about-us' 
                        spy={true} 
                        offset={-1000}
                        duration={500} 
                        className='nav-link'>
                            Inicio
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                        to='about-us' 
                        spy={true} 
                        offset={-70} 
                        duration={500} 
                        className='nav-link'>
                            Acerca de
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                        to='contact-us' 
                        spy={true} 
                        offset={-100} 
                        duration={500} 
                        className='nav-link'>
                            Contacto
                        </Link>
                    </li>
                    <br/>
                    <li className="nav-item">
                        <a className="nav-link" href="participantes">Participantes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="proyectos">Proyectos</a>
                    </li>
                    </ul>

                    <div className="navbar-nav m-ms-auto buttons-container">
                        <SignUp />
                        <Login />
                    </div>
                </div>
            </div>
        </nav>
        </div>
    )
}
