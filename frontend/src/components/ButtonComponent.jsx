//material UI imports
import Button from "@mui/material/Button";

//material UI creating theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: blueGrey,
    // secondary: purple,
  },
});

function ButtonComponent({ label, size, type, disabled, onClick }) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant='contained'
        size={size}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {disabled ? "Submitting" : label}
      </Button>
    </ThemeProvider>
  );
}
export default ButtonComponent;
