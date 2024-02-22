//using Link
import { Link, Form, useNavigation } from "react-router-dom";
import { redirect } from "react-router-dom"; //used to redirect in the action function
import axios from "axios";
import { toast } from "react-toastify";

//import components
import TextInputComponent from "../components/TextInputComponent.jsx";
import ButtonComponent from "../components/ButtonComponent.jsx";
import Container from "@mui/material/Container";

//import CSS styles
import styles from "../utils/styles/RegisterStyles.module.css";

//action function for submitting
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from the forms
  const data = Object.fromEntries(formData); //converts data (formData) to usable object.
  try {
    await axios.post("/api/users/register", data);
    toast.success("User successfuly Registered");
    return redirect("/Dashboard");
  } catch (err) {
    console.log(err);
    toast.error(
      Array.isArray(err.response.data.message)
        ? err.response.data.message[0]
        : err.response.data.message
    );
    return err;
  }
};

function Register() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Container fixed className={styles.registerContainer}>
      <Form method='post'>
        <h1>Register An Account</h1>
        <div className={styles.textInputContainer}>
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
            type={"password"}
          />
        </div>
        <div className={styles.buttonContainer}>
          <ButtonComponent
            label={"Register"}
            size={"small"}
            type={"submit"}
            disabled={isSubmitting}
          />
        </div>
        <div className={styles.loginLink}>
          Have an account already?
          <Link to={"/login"}> Login</Link>
        </div>
      </Form>
    </Container>
  );
}
export default Register;
