//using Link
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//import MUI component
import TextInputComponent from "../components/TextInputComponent.jsx";
import ButtonComponent from "../components/ButtonComponent.jsx";
import Container from "@mui/material/Container";

//CSS import
import styles from "../utils/styles/loginStyles.module.css";

//action function
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/users/login", data);
    toast.success(`Welcome ${data.email}`);
    return redirect("/");
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

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Container className={styles.loginContainer}>
      <Form method='post'>
        <h1>Login</h1>
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
