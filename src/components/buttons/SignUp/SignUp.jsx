import './SignUp.css'
import SignUpModal from '../../SignUpModal/SignUpModal'


function SignUp(){
    function handleClick() {
        alert("hiciste click en el boton de sumate");
        

      }
    return (
        <>
            <button type="button" 
            className="btn btn-outline-success" 
            id="sumate" 
            onClick={handleClick}>
                ¡Sumate!
            </button>
        </>
    )
}

export default SignUp;