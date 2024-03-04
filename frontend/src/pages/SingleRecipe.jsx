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

//component import
import IngredientTable from "../components/IngredientTable.jsx";
import RecipeInstructionCard from "../components/RecipeInstructionCard.jsx";

//CSS styles
import styles from "../utils/styles/SingleRecipe.module.css";

//loader function to obtain specific recipe
export const loader = async ({ params }) => {
  try {
    const singleRecipe = axios.get(`/api/recipes/${params.id}`);
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
  console.log(recipeData);

  return (
    <div>
      <Container maxWidth='md' className={styles.recipeContainer}>
        <Card sx={{ maxWidth: 800 }} className={styles.cardContainer}>
          <CardMedia
            component='img'
            alt='green iguana'
            height='450'
            image='https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
        </Card>
      </Container>
    </div>
  );
}
export default SingleRecipe;
