//MUI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function TextfieldComponent({ label, value, handleInputChange, name }) {
  return (
    <Box>
      <TextField
        id='outlined-multiline-static'
        label={label}
        multiline
        rows={8}
        fullWidth
        value={value}
        onChange={handleInputChange}
        name={name}
        // defaultValue='Default Value'
      />
    </Box>
  );
}
export default TextfieldComponent;
