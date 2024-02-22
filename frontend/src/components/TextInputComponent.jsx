//material UI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//CSS styles
import styles from "../utils/styles/RegisterStyles.module.css";

function TextInputComponent({ label, name, type, defaultValue }) {
  return (
    <div className={styles.textContainer}>
      <TextField
        id={name}
        label={label}
        variant='outlined'
        size='small'
        name={name}
        type={type}
        defaultValue={defaultValue}
      />
    </div>
  );
}
export default TextInputComponent;
