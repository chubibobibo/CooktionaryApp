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

//action function to sub,it request
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from form
  const data = Object.fromEntries(formData); //converts to usable object
  try {
    const recipeData = await axios.post("/api/recipes/createRecipe", data);
    console.log(recipeData);
    toast.success("Recipe created");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

function AddRecipe() {
  //state to handle the recipe ingredients and qty
  // const [ingredient, setIngredient] = useState([
  //   {
  //     ingredientName: "",
  //     ingredientQty: "",
  //   },
  // ]);

  //adding an ingredient input field
  // function addInputField() {
  //   setIngredient((old) => {
  //     return [...old, { ingredientName: "", ingredientQty: "" }];
  //   });
  // }
  // console.log(ingredient[0].ingredientName);

  // function to handle changes in the input fields
  // const ingredientNameChange = (e, idx) => {
  //   ingredient[idx].ingredientName = e.target.value;
  //   // const ingredientArr = ingredient[idx];
  //   // console.log(e.target.value);
  //   // console.log(ingredient.ingredientName);
  //   setIngredient((oldData) => {
  //     return [...oldData, { ingredientName: e.target.value }];
  //   });
  // };
  // // console.log(ingredient.ingredientName);

  // const ingredientNameChange = (e, idx) => {
  //   ingredient[idx].ingredientName = e.target.value;
  //   // const newIng = ingredient.map((ing) => {
  //   //   return { ...ing, ingredientName: ingredient.ingredientName };
  //   // });
  //   setIngredient((oldData) => {
  //     return [...oldData, ingredient.ingredientName];
  //   });
  // };

  // const ingredientQtyChange = (e, idx) => {
  //   ingredient[idx].ingredientQty = e.target.value;
  //   setIngredient((oldQty) => {
  //     return [...oldQty, ingredient[idx].ingredientQty];
  //   });
  // };

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
            />
            {ingredient.map((ingredients, idx) => {
              return (
                <div key={idx}>
                  <TextInputComponent
                    label={"Ingredient Name"}
                    name={"ingredientName"}
                    type={"text"}
                    // onChange={(e) => ingredientNameChange(e, idx)}
                    // value={ingredients.ingredientName}
                  />
                  <TextInputComponent
                    label={"Ingredient Quantity"}
                    name={"ingredientQty"}
                    type={"text"}
                    // onChange={(e) => ingredientQtyChange(e, idx)}
                    value={ingredients.recipeQty}
                  />
                </div>
              );
            })}
            {/* Note: add onClick property in ButtonComponent */}
            <ButtonComponent
              label={"Add Ingredient"}
              type={"button"}
              size={"small"}
              // onClick={addInputField}
            />
            <TextInputComponent
              label={"Recipe Instructions"}
              name={"recipeInstructions"}
              type={"text"}
            />
            <TextInputComponent
              label={"Recipe Description"}
              name={"recipeDescription"}
              type={"text"}
            />
            <TextInputComponent
              label={"cooking Time"}
              name={"cookingTime"}
              type={"number"}
            />
            <SelectComponent label={"Dish"} name={"dish"} />
          </Box>
          <ButtonComponent
            name={"submit"}
            size={"small"}
            type={"submit"}
            label={"submit"}
          />
        </Container>
      </Form>
    </>
  );
}
export default AddRecipe;
