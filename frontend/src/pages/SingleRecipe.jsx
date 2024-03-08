//MUI imports
import { Box } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, Link, Form } from "react-router-dom";
import { createContext } from "react";
import { useState, useEffect } from "react";

//component import
import IngredientTable from "../components/IngredientTable.jsx";
import RecipeInstructionCard from "../components/RecipeInstructionCard.jsx";

//CSS styles
import styles from "../utils/styles/SingleRecipe.module.css";

//loader function to obtain specific recipe
export const loader = async ({ params }) => {
  try {
    const singleRecipe = await axios.get(`/api/recipes/${params.id}`);
    return singleRecipe;
  } catch (err) {
    console.log(err);
    toast.error(
      Array.isArray(
        //checks if an array
        err.response.data.message
          ? err.response.data.message[0]
          : err.response.data.message
      )
    );
  }
};

//create context
export const IngredientContext = createContext();

function SingleRecipe() {
  //obtain data from loader
  const recipeData = useLoaderData();
  // console.log(loggedUser);

  //state for logged user
  const [loggedUser, setLoggedUser] = useState();
  //obtaining logged user to hide modify and delete btns
  useEffect(() => {
    async function user() {
      const foundUser = await axios.get("/api/admin/loggedUser");
      // console.log(foundUser.data.user);
      setLoggedUser(foundUser.data.user._id);
    }
    user();
  }, []);
  // console.log(loggedUser);

  return (
    <div>
      <Container maxWidth='md' className={styles.recipeContainer}>
        <Card sx={{ maxWidth: 800 }} className={styles.cardContainer}>
          <CardMedia
            component='img'
            alt='food img'
            height='400'
            image={recipeData.data.singleRecipe.avatarUrl}
          />
          <CardContent className={styles.recipeCard}>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              className={styles.recipeTitle}
            >
              {recipeData.data.singleRecipe.recipeName}
            </Typography>
            {/* //render a table for the ingredients and a card component to render instructions */}
            <IngredientContext.Provider value={recipeData}>
              <IngredientTable />
              <RecipeInstructionCard />
            </IngredientContext.Provider>
          </CardContent>
          {loggedUser === recipeData.data.singleRecipe.createdBy && (
            <CardActions>
              <Link
                to={`/dashboard/edit-recipe/${recipeData.data.singleRecipe._id}`}
              >
                <Button size='small'>Modify</Button>
              </Link>
              <Form
                method='post'
                action={`/dashboard/delete-job/${recipeData.data.singleRecipe._id}`} //path specified in the app.jsx to render the DeleteRecipe.jsx
              >
                <Button type='submit' size='small'>
                  Delete
                </Button>
              </Form>
            </CardActions>
          )}
        </Card>
      </Container>
    </div>
  );
}
export default SingleRecipe;
