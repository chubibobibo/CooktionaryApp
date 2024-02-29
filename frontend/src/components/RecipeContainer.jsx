//MUI imports
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import { allRecipeContext } from "../pages/AllRecipe.jsx";
import { Form, Link } from "react-router-dom";

//import CSS
import styles from "../utils/styles/AllPages.module.css";

//card imports
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//MUICard component imports
import { Item } from "../utils/MUIStyles/MUICard.jsx";

function RecipeContainer() {
  //instantiate useContext
  const context = useContext(allRecipeContext);
  const { allRecipe } = context;
  //   console.log(allRecipe);

  return (
    <>
      {allRecipe.data.allRecipes.map((newRecipes) => {
        console.log(newRecipes);
        return (
          <Grid xs={12} md={6} lg={3} key={newRecipes._id}>
            <Card sx={{ maxWidth: 345 }} elevation={20}>
              {/* <CardMedia sx={{ height: 140 }} image='' title='green iguana' /> */}
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  className={styles.recipeTitle}
                >
                  {newRecipes.recipeName}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  pariatur, fuga labore commodi libero accusantium veritatis
                  ducimus quasi iusto quos! Aliquam nostrum adipisci illo
                  ducimus animi soluta architecto, quia consequuntur? */}
                  {newRecipes.recipeDescription}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/dashboard/${newRecipes._id}`}>
                  <Button size='small'>Details</Button>
                </Link>
                <Link to='/dashboard/edit-recipe'>
                  <Button size='small'>Modify</Button>
                </Link>
                <Form
                  method='post'
                  action={`/dashboard/delete-job/${newRecipes._id}`} //path specified in the app.jsx to render the DeleteRecipe.jsx
                >
                  <Button type='submit' size='small'>
                    Delete
                  </Button>
                </Form>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );
}
export default RecipeContainer;
