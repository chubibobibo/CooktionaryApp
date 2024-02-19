//using Link
import { Link } from "react-router-dom";
function Register() {
  return (
    <div>
      Register
      <div>
        Have an account already?
        <Link to={"/login"}> Login</Link>
      </div>
    </div>
  );
}
export default Register;
