//material UI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//CSS styles
import "../utils/styles/RegisterStyles.css";

function TextInputComponent({ label, name }) {
  return (
    <div className='textContainer'>
      <TextField
        id={name}
        label={label}
        variant='outlined'
        size='small'
        name={name}
      />
    </div>
  );
}
export default TextInputComponent;
