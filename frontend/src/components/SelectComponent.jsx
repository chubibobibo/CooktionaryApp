import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectComponent({
  label,
  name,
  handleInputChange,
  recipeData,
  value,
}) {
  const dishObj = {
    PORK: "pork",
    BEEF: "beef",
    CHICKEN: "chicken",
    VEGETARIAN: "vegetarian",
    FISH: "fish",
  };

  return (
    <Box sx={{ maxWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{"Dish"}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value}
          label={label}
          name={name}
          onChange={handleInputChange}
        >
          <MenuItem value={dishObj.PORK}>Pork</MenuItem>
          <MenuItem value={dishObj.BEEF}>Beef</MenuItem>
          <MenuItem value={dishObj.CHICKEN}>Chicken</MenuItem>
          <MenuItem value={dishObj.VEGETARIAN}>Vegetarian</MenuItem>
          <MenuItem value={dishObj.FISH}>Fish</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default SelectComponent;
