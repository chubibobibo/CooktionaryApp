//import CSS styles
import "../utils/styles/IndexStyles.css";

//import material UI components
import ButtonComponent from "../components/ButtonComponent.jsx";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { Link } from "react-router-dom";

function Index() {
  return (
    <div className='indexContainer'>
      <Container maxWidth='lg'>
        <h1>Cooktionary</h1>
        <div className='parContainer'>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, ipsa
            expedita necessitatibus recusandae amet adipisci laboriosam saepe
            repellendus sed, eligendi quis corrupti. Provident, minus impedit
            delectus dolore a facere praesentium?
          </p>
        </div>
        <div className='btnContainer'>
          <Stack direction='row' spacing={3}>
            <Link to={"/register"}>
              <ButtonComponent label={"Register"} size={"large"} />
            </Link>
            <Link to={"/login"}>
              <ButtonComponent label={"Login"} size={"large"} />
            </Link>
            <ButtonComponent label={"Test User"} size={"large"} />
          </Stack>
        </div>
      </Container>
    </div>
  );
}
export default Index;
