//component imports
import TextInputComponent from "./TextInputComponent";
import ButtonComponent from "./ButtonComponent";
import SelectComponent from "./SelectComponent.jsx";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

//MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Box } from "@mui/material/";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//css imports
import styles from "../utils/styles/Search.module.css";

function SearchComponent() {
  //loader data
  const recipes = useLoaderData();
  console.log(recipes);
  //state to control the select input.
  const [selectData, setSelectData] = useState({ dish: "" });
  const handleSelectData = (e) => {
    setSelectData((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
    // setSelectData({dish:[e.target.value]: e.target.name})
  };

  const dishObj = {
    PORK: "pork",
    BEEF: "beef",
    CHICKEN: "chicken",
    VEGETARIAN: "vegetarian",
    FISH: "fish",
  };

  return (
    <Container maxWidth='sm' className={styles.SearchContainer}>
      <Typography>Search</Typography>
      <form>
        {/* sending this input field as "search" which we will be using as query in  recipeControllers */}
        <TextInputComponent
          name={"search"}
          label={"Recipe name"}
          type={"search"}
        />
        {/* <SelectComponent
          label={"Dish"}
          name={"dish"}
          //   value={""}
          //   recipeData={selectData}
          handleInputChange={handleSelectData}
        /> */}
        <Box sx={{ maxWidth: 150, mt: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>{"Dish"}</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label={"Dish"}
              value={selectData.dish}
              name={"dish"}
              onChange={handleSelectData}
              size='small'
            >
              <MenuItem value={dishObj.PORK}>Pork</MenuItem>
              <MenuItem value={dishObj.BEEF}>Beef</MenuItem>
              <MenuItem value={dishObj.CHICKEN}>Chicken</MenuItem>
              <MenuItem value={dishObj.VEGETARIAN}>Vegetarian</MenuItem>
              <MenuItem value={dishObj.FISH}>Fish</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ButtonComponent label={"Search"} size={"small"} type={"submit"} />
      </form>
    </Container>
  );
}
export default SearchComponent;
