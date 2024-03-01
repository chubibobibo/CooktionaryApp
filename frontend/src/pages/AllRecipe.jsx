import Container from "@mui/material/Container";
import { Box } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";

//component imports
import RecipeContainer from "../components/RecipeContainer.jsx";

import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { createContext } from "react";

//loader function to obtain data from API
export const loader = async () => {
  try {
    const allRecipe = await axios.get("/api/recipes/");
    // console.log(allRecipe);
    return allRecipe;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

//creating contexxt
export const allRecipeContext = createContext();

function AllRecipe() {
  const allRecipe = useLoaderData(); //we need to pass the data to the recipeContainer using context
  // console.log(allRecipe);
  return (
    <Container maxWidth='xl'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <allRecipeContext.Provider value={{ allRecipe }}>
            {allRecipe !== 0 ? (
              <RecipeContainer />
            ) : (
              <alert>No recipe found</alert>
            )}
          </allRecipeContext.Provider>
        </Grid>
      </Box>
    </Container>
  );
}
export default AllRecipe;
