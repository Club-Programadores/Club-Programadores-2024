import "./SignUp.css";

const SignUp = ({ onClick }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-success"
        id="sumate"
        onClick={onClick}
      >
        Registrarse
      </button>
    </>
  );
};

export default SignUp;
