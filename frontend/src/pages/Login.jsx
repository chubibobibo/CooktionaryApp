//using Link
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//import MUI component
import TextInputComponent from "../components/TextInputComponent.jsx";
import ButtonComponent from "../components/ButtonComponent.jsx";
import Container from "@mui/material/Container";

//CSS import
import styles from "../utils/styles/loginStyles.module.css";

//object that will contain a message to display an error
const errorMsg1 = {
  message: "",
};

//action function
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (data.password.length < 8) {
    errorMsg1.message = "Password should be atleast 8 characters";
    return errorMsg1;
  }
  try {
    await axios.post("/api/users/login", data);
    toast.success(`Welcome ${data.email}`);
    return redirect("/dashboard/all-recipe");
  } catch (err) {
    console.log(err);
    //determine id error message is an array(in case there are more than 1 error caught) then chose to display the first error. If there is only 1 error caught (message is not an array then return just the message)
    toast.error(
      Array.isArray(err.response.data.message)
        ? err.response.data.message[0]
        : err.response.data.message
    );
    return err;
  }
};

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  //obtaining returned data (errorMessage) from action function
  const errorMsg1 = useActionData();

  return (
    <Container className={styles.loginContainer}>
      <Form method='post'>
        <h1>Login</h1>
        {/* render a message depending on the object that we created */}

        {errorMsg1 && <p style={{ color: "red" }}>{errorMsg1.message}</p>}
        <div className={styles.textInputContainer}>
          <TextInputComponent label={"Email"} name={"email"} type={"text"} />
          <TextInputComponent
            label={"Password"}
            name={"password"}
            type={"password"}
          />
        </div>
        <div className={styles.buttonContainer}>
          <ButtonComponent
            label={"Login"}
            size={"small"}
            type={"submit"}
            disabled={isSubmitting}
          />
        </div>
        <div className={styles.loginLink}>
          No account yet?
          <Link to={"/register"}> Register</Link>
        </div>
      </Form>
    </Container>
  );
}
export default Login;
