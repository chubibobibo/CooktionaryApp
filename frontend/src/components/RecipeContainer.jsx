//MUI imports
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { allRecipeContext } from "../pages/AllRecipe.jsx";

//card imports
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function RecipeContainer() {
  //instantiate useContext
  const context = useContext(allRecipeContext);
  const allRecipe = context;
  console.log(allRecipe);
  return (
    <>
      {allRecipe.data.allRecipes.map((newRecipes) => {
        return (
          <Grid xs={12} md={6} lg={3} key={newRecipes._id}>
            <Card sx={{ maxWidth: 345 }} elevation={10}>
              {/* <CardMedia sx={{ height: 140 }} image='' title='green iguana' /> */}
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {newRecipes.recipeName}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Share</Button>
                <Button size='small'>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );
}
export default RecipeContainer;
