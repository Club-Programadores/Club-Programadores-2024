function Login({ onClick }) {
  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      id="login-btn"
      onClick={onClick}
    >
      Login
    </button>
  );
}

export default Login;
