//Mui imports
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ButtonComponent from "../components/ButtonComponent.jsx";

import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//component imports
import TextInputComponent from "../components/TextInputComponent.jsx";
import SelectComponent from "../components/SelectComponent.jsx";

function AddRecipe2() {
  //state to handle data from forms
  const [recipeData, setRecipeData] = useState({
    recipeName: "",
    recipeIngredients: [
      {
        ingredientName: "",
        ingredientQty: "",
      },
    ],
    recipeInstructions: "",
    recipeDescription: "",
    cookingTime: "",
    dish: "",
  });

  //function to handle input fields
  const handleInputChange = (e) => {
    setRecipeData((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
  };

  //function to handle ingredient name
  const handleIngredientName = (e, idx) => {
    //accepts event and idx to track each unique input
    const newIngredient = recipeData.recipeIngredients; //obtaining the recipeIngredient element from the recipeData array
    newIngredient[idx].ingredientName = e.target.value; //obtained the exact recipeIngredient from the recipeData array using idx then giving it a value from the corresponding input
    setRecipeData((oldData) => {
      //basically creating a copy returning all the prev values of the recipeData, then obtaining the recipeIngredient element which contains an array. Then modifying the key of ingredientName with the new value of recipeIngredients that we assigned value of e.target.value
      return {
        ...oldData,
        [oldData.recipeIngredients]: {
          ingredientName: recipeData.recipeIngredients,
        },
      };
    });
  };

  //function to handle change in ingreidient qty
  const handleQty = (e, idx) => {
    const newQty = recipeData.recipeIngredients;
    newQty[idx].ingredientQty = e.target.value;
    setRecipeData((oldData) => {
      return {
        ...oldData,
        [oldData.recipeIngredients]: { ingredientQty: newQty.ingredient },
      };
    });
  };

  //function to add new input fields
  const addInputField = () => {
    setRecipeData((oldData) => {
      return {
        ...oldData, //returns all prev values of the recipeData obj
        recipeIngredients: [
          //changing the recipeIngredient with a new array containing all the prev values of oldData.recipeIngredients and creating a new object of ingredientName and ingredientQty
          ...oldData.recipeIngredients,
          { ingredientName: "", ingredientQty: "" },
        ],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRecipeData = await axios.post(
        "/api/recipes/createRecipe",
        recipeData
      );
      toast.success("New Recipe Created");
      return recipeData;
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <Form method='post'>
        <Container maxWidth='xl'>
          <Box>
            <TextInputComponent
              label={"Recipe Name"}
              name={"recipeName"}
              type={"text"}
              onChange={handleInputChange}
              value={recipeData.recipeName}
            />
            {recipeData.recipeIngredients.map((newRecipeData, idx) => {
              return (
                <div key={idx}>
                  <TextInputComponent
                    label={"Ingredient Name"}
                    name={"ingredientName"}
                    type={"text"}
                    onChange={(e) => handleIngredientName(e, idx)}
                    value={newRecipeData.ingredientName}
                  />
                  <TextInputComponent
                    label={"Ingredient Quantity"}
                    name={"ingredientQty"}
                    type={"text"}
                    onChange={(e) => handleQty(e, idx)}
                    value={newRecipeData.ingredientQty}
                  />
                </div>
              );
            })}

            {/* Note: add onClick property in ButtonComponent */}
            <ButtonComponent
              label={"Add Ingredient"}
              type={"button"}
              size={"small"}
              onClick={addInputField}
            />
            <TextInputComponent
              label={"Recipe Instructions"}
              name={"recipeInstructions"}
              type={"text"}
              onChange={handleInputChange}
              value={recipeData.recipeInstructions}
            />
            <TextInputComponent
              label={"Recipe Description"}
              name={"recipeDescription"}
              type={"text"}
              onChange={handleInputChange}
              value={recipeData.description}
            />
            <TextInputComponent
              label={"cooking Time"}
              name={"cookingTime"}
              type={"number"}
              onChange={handleInputChange}
              value={recipeData.cookingTime}
            />
            <SelectComponent
              label={"Dish"}
              name={"dish"}
              //   value={recipeData.dish}
            />
          </Box>
          <ButtonComponent
            name={"submit"}
            size={"small"}
            type={"submit"}
            label={"submit"}
            onClick={handleSubmit}
          />
        </Container>
      </Form>
    </>
  );
}
export default AddRecipe2;
