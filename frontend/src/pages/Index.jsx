//import CSS styles
import "../utils/styles/IndexStyles.css";

//import material UI components
import ButtonComponent from "../components/ButtonComponent.jsx";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { colors } from "@mui/material";

function Index() {
  return (
    <div>
      <Container className='indexContainer' maxWidth='lg'>
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
            <ButtonComponent label={"Register"} />
            <ButtonComponent label={"Login"} />
            <ButtonComponent label={"Test User"} />
          </Stack>
        </div>
      </Container>
    </div>
  );
}
export default Index;
