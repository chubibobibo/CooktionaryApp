import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectComponent({ label, name, value, valueLabel }) {
  //state to handle changes in the select input
  const [category, setCategory] = React.useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const dish = {
    PORK: "pork",
    BEEF: "beef",
    CHICKEN: "chicken",
    VEGETARIAN: "vegetarian",
    FISH: "fish",
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={category}
          label={label}
          name={name}
          onChange={handleChange}
        >
          <MenuItem value={dish.PORK}>Pork</MenuItem>
          <MenuItem value={dish.BEEF}>Beef</MenuItem>
          <MenuItem value={dish.CHICKEN}>Chicken</MenuItem>
          <MenuItem value={dish.VEGETARIAN}>Vegetarian</MenuItem>
          <MenuItem value={dish.FISH}>Fish</MenuItem>
        </Select>
        <p>{category}</p>
      </FormControl>
    </Box>
  );
}
export default SelectComponent;
