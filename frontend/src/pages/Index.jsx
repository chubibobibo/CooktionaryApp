//import CSS styles
import styles from "../utils/styles/IndexStyles.module.css";

//import material UI components
import ButtonComponent from "../components/ButtonComponent.jsx";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Index() {
  //instantaite useNavigate
  const navigate = useNavigate();

  //object to use as login
  const testUser = {
    email: "test@gmail.com",
    password: "testtest",
  };

  //click handler to login the test user
  const handleLogin = async (testUser) => {
    try {
      await axios.post("/api/users/login", testUser);
      navigate("/dashboard/all-recipe");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.indexContainer}>
      <Container maxWidth='lg'>
        <h1>Cooktionary</h1>
        <div className={styles.parContainer}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, ipsa
            expedita necessitatibus recusandae amet adipisci laboriosam saepe
            repellendus sed, eligendi quis corrupti. Provident, minus impedit
            delectus dolore a facere praesentium?
          </p>
        </div>
        <div className={styles.btnContainer}>
          <Stack direction='row' spacing={3}>
            <Link to={"/register"}>
              <ButtonComponent label={"Register"} size={"large"} />
            </Link>
            <Link to={"/login"}>
              <ButtonComponent label={"Login"} size={"large"} />
            </Link>
            <ButtonComponent
              label={"Explore the App"}
              size={"large"}
              onClick={() => {
                handleLogin(testUser);
              }}
            />
          </Stack>
        </div>
      </Container>
    </div>
  );
}
export default Index;
