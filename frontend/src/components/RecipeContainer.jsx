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
import CardMedia from "@mui/material/CardMedia";

//MUICard component imports
import { Item } from "../utils/MUIStyles/MUICard.jsx";
import { Box } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";

function RecipeContainer() {
  //instantiate useContext
  const context = useContext(allRecipeContext);
  const { allRecipe } = context;
  // console.log(allRecipe);

  //object for dynamic classes
  const dynamicClass = {
    chicken: styles.chicken,
    beef: styles.beef,
    fish: styles.fish,
    vegetarian: styles.vegetarian,
    pork: styles.pork,
  };

  //state for logged user
  const [loggedUser, setLoggedUser] = useState();
  //load data from loggedUser API
  useEffect(() => {
    const user = async () => {
      const foundUser = await axios.get("/api/admin/loggedUser");
      // console.log(foundUser);
      setLoggedUser(foundUser.data.user._id);
    };
    user();
  }, []);

  console.log(loggedUser);
  console.log(allRecipe);
  return (
    <>
      {allRecipe.data.allRecipes.map((newRecipes) => {
        return (
          <Grid xs={12} md={6} xl={3} key={newRecipes._id}>
            <Card
              sx={{
                minWidth: 200,
                maxWidth: 345,
                maxHeight: 600,
                minHeight: 675,
              }}
              elevation={20}
              className={styles.cardContainer}
            >
              <CardMedia
                sx={{ height: 200 }}
                image={newRecipes.avatarUrl}
                title='food image'
              />
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
                <Typography
                  variant='button'
                  className={dynamicClass[newRecipes.dish]} //using the object dynamicClass the accessing the value using the newRecipes.dish as key
                >
                  {newRecipes.dish}
                </Typography>
                <Typography variant='body2'>
                  Cooking Time: {newRecipes.cookingTime} mins.
                </Typography>
                <Typography variant='body2'>
                  Created By: {newRecipes.author}
                </Typography>
              </CardContent>
              <CardActions className={styles.cardAction}>
                <Link to={`/dashboard/${newRecipes._id}`}>
                  <Button size='small'>Details</Button>
                </Link>
                {loggedUser === newRecipes.createdBy && (
                  <Form
                    method='post'
                    action={`/dashboard/delete-job/${newRecipes._id}`} //path specified in the app.jsx to render the DeleteRecipe.jsx
                  >
                    <Button type='submit' size='small'>
                      Delete
                    </Button>
                  </Form>
                )}
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );
}
export default RecipeContainer;
