//material UI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//CSS styles
import styles from "../utils/styles/RegisterStyles.module.css";

function TextInputComponent({ label, name, type }) {
  return (
    <div className={styles.textContainer}>
      <TextField
        id={name}
        label={label}
        variant='outlined'
        size='small'
        name={name}
        type={type}
      />
    </div>
  );
}
export default TextInputComponent;
