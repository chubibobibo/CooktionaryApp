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
import Chip from "@mui/material/Chip";

//MUICard component imports
import { Item } from "../utils/MUIStyles/MUICard.jsx";
import { Box } from "@mui/material";

function RecipeContainer() {
  //instantiate useContext
  const context = useContext(allRecipeContext);
  const { allRecipe } = context;
  //   console.log(allRecipe);

  //object for dynamic classes
  const dynamicClass = {
    chicken: styles.chicken,
    beef: styles.beef,
    fish: styles.fish,
    vegetarian: styles.vegetarian,
    pork: styles.pork,
  };

  return (
    <>
      {allRecipe.data.allRecipes.map((newRecipes) => {
        console.log(newRecipes);
        return (
          <Grid xs={12} md={6} xl={3} key={newRecipes._id}>
            <Card
              sx={{ maxWidth: 345, maxHeight: 345, minHeight: 345 }}
              elevation={20}
              className={styles.cardContainer}
            >
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
                  {newRecipes.recipeDescription}
                </Typography>
                <div className={dynamicClass[newRecipes.dish]}>
                  {newRecipes.dish}
                </div>
              </CardContent>
              <CardActions className={styles.cardAction}>
                <Link to={`/dashboard/${newRecipes._id}`}>
                  <Button size='small'>Details</Button>
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
