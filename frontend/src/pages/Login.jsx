//using Link
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      Login
      <div>
        No account yet?
        <Link to={"/register"}> Register</Link>
      </div>
    </div>
  );
}
export default Login;
