//using Link
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom"; //used to redirect in the action function
import axios from "axios";

//import components
import TextInputComponent from "../components/TextInputComponent.jsx";
import { Form } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent.jsx";

//import CSS styles
import "../utils/styles/RegisterStyles.css";

//action function for submitting
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from the forms
  const data = Object.fromEntries(formData); //converts data (formData) to usable object.
  try {
    await axios.post("/api/users/register", data);
    return redirect("/");
  } catch (err) {
    console.log(err);
    return err;
  }
};

function Register() {
  return (
    <div className='registerContainer'>
      <Form method='post'>
        <h1>Register An Account</h1>
        <div className='textInputContainer'>
          <TextInputComponent label={"Name"} name={"name"} type={"text"} />
          <TextInputComponent
            label={"Last Name"}
            name={"lastName"}
            type={"text"}
          />
          <TextInputComponent label={"Email"} name={"email"} />
          <TextInputComponent
            label={"Password"}
            name={"password"}
            type={"text"}
          />
        </div>
        <div className='buttonContainer'>
          <ButtonComponent label={"Register"} size={"small"} type={"submit"} />
        </div>
        <div className='loginLink'>
          Have an account already?
          <Link to={"/login"}> Login</Link>
        </div>
      </Form>
    </div>
  );
}
export default Register;
