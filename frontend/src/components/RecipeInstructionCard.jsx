//MUI imports
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import { IngredientContext } from "../pages/SingleRecipe.jsx";

//css imports
import styles from "../utils/styles/SingleRecipe.module.css";

function RecipeInstructionCard() {
  const context = useContext(IngredientContext);
  const recipeData = context;
  //   console.log(recipeData);
  return (
    <Card elevation={10} className={styles.instructionCard}>
      <CardContent>
        <Typography>
          {` Cooking Time: ${recipeData.data.singleRecipe.cookingTime} mins.`}
        </Typography>
        <br />
        <Typography variant='h6'>Instructions:</Typography>
        <Typography variant='body2'>
          {recipeData.data.singleRecipe.recipeInstructions}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default RecipeInstructionCard;
