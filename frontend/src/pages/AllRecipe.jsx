import Container from "@mui/material/Container";
import { Box } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";

//component imports
import RecipeContainer from "../components/RecipeContainer.jsx";
import SearchComponent from "../components/SearchComponent.jsx";

import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { createContext } from "react";
import Alert from "@mui/material/Alert";

//loader function to obtain data from API
//UPDATE: implementing queries, accepting request.url that contains the search queries(request.url).
export const loader = async ({ request }) => {
  //accepts requests for queries
  console.log(request);
  try {
    //creating a new URL using the request.url then obtain the query params using searchParams.entries(). Then convert to a useable object.
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const allRecipe = await axios.get("/api/recipes/", { params });
    return allRecipe;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
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
        <Grid>
          <SearchComponent />
        </Grid>
        <Grid container spacing={5}>
          <allRecipeContext.Provider value={{ allRecipe }}>
            {allRecipe?.data?.allRecipes ? (
              <RecipeContainer />
            ) : (
              <Alert>No recipe found</Alert>
            )}
          </allRecipeContext.Provider>
        </Grid>
      </Box>
    </Container>
  );
}
export default AllRecipe;
