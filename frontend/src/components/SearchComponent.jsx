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
import Grid from "@mui/material/Unstable_Grid2";

//css imports
import styles from "../utils/styles/Search.module.css";

function SearchComponent() {
  //loader data
  const recipes = useLoaderData();
  console.log(recipes);
  //state to control the select input.
  const [selectData, setSelectData] = useState({ dish: "", sort: "" });
  //event handler to obtain data from the select input
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

  const sortingOptions = {
    NEWEST: "newest",
    OLDEST: "oldest",
    AZ: "a-z",
    ZA: "z-a",
  };

  return (
    <Container maxWidth='sm' className={styles.SearchContainer}>
      <Typography>Search</Typography>
      <form>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <TextInputComponent
              name={"search"}
              label={"Recipe name"}
              type={"search"}
            />
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
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ maxWidth: 150, mt: 2, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>{"Sort"}</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label={"Sort"}
                  value={selectData.sort}
                  name={"sort"}
                  onChange={handleSelectData}
                  size='small'
                >
                  <MenuItem value={sortingOptions.NEWEST}>Newset</MenuItem>
                  <MenuItem value={sortingOptions.OLDEST}>Oldest</MenuItem>
                  <MenuItem value={sortingOptions.AZ}>A-Z</MenuItem>
                  <MenuItem value={sortingOptions.ZA}>Z-A</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        {/* sending this input field as "search" which we will be using as query in  recipeControllers */}

        <ButtonComponent label={"Search"} size={"small"} type={"submit"} />
      </form>
    </Container>
  );
}
export default SearchComponent;
