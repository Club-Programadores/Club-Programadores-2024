import SignUp from '../buttons/SignUp';
import './HeroBanner.css'

function HeroBanner(){
    return (
        <>
        <div class="hero-banner">
            <div className="call-to-action">
                <h1 class="m-3">¡Sumate al Club de Programador@s del CUVL!</h1>
                <div class="btn-container">
                    <SignUp />
                </div>
            </div>
        </div>
        </>
    )
}

export default HeroBanner;