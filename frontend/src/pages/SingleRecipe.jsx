//MUI imports
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, redirect } from "react-router-dom";
import { createContext } from "react";

//component import
import IngredientTable from "../components/IngredientTable.jsx";

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
      <CssBaseline />
      <Container maxWidth='md' className={styles.recipeContainer}>
        <Card sx={{ maxWidth: 800 }}>
          <CardMedia
            component='img'
            alt='green iguana'
            height='450'
            image='https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {recipeData.data.singleRecipe.recipeName}
            </Typography>
            {/* <Typography gutterBottom variant='h6' component='div'>
              Ingredients:
            </Typography> */}

            {/* {recipeData.data.singleRecipe.recipeIngredients.map(
              (newIngredients) => {
                console.log(newIngredients);
                return (
                  <Typography gutterBottom variant='sp' component='div'>
                    {newIngredients.ingredientName}:
                    {newIngredients.ingredientQty}
                  </Typography>
                );
              }
            )} */}
            <IngredientContext.Provider value={recipeData}>
              <IngredientTable />
            </IngredientContext.Provider>
          </CardContent>
          <CardActions>
            <Button size='small'>Share</Button>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}
export default SingleRecipe;
