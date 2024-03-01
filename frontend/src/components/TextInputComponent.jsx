//material UI imports
import { Box } from "@mui/material/";
import TextField from "@mui/material/TextField";

//CSS styles
import styles from "../utils/styles/RegisterStyles.module.css";

function TextInputComponent({
  label,
  name,
  type,
  defaultValue,
  value,
  onChange,
}) {
  return (
    <div className={styles.textContainer}>
      <TextField
        id={name}
        label={label}
        variant='outlined'
        size='small'
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        fullWidth
      />
    </div>
  );
}
export default TextInputComponent;
