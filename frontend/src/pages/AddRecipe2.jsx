//Mui imports
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ButtonComponent from "../components/ButtonComponent.jsx";
import Grid from "@mui/material/Unstable_Grid2";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigation, useNavigate } from "react-router-dom";

//component imports
import TextInputComponent from "../components/TextInputComponent.jsx";
import TextfieldComponent from "../components/TextfieldComponent.jsx";
import SelectComponent from "../components/SelectComponent.jsx";

//CSS imports
import styles from "../utils/styles/AddRecipe.module.css";
import { Item } from "../utils/MUIcomponents/NavbarComponents.js";

function AddRecipe2() {
  //object for select input
  const dish = {
    PORK: "pork",
    BEEF: "beef",
    CHICKEN: "chicken",
    VEGETARIAN: "vegetarian",
    FISH: "fish",
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();

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
    const newIngredient = recipeData.recipeIngredients; //obtaining the recipeIngredient element from the recipeData object
    newIngredient[idx].ingredientName = e.target.value; //obtained the exact recipeIngredient using idx then giving it a value from the corresponding input
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
      await axios.post("/api/recipes/createRecipe", recipeData);
      toast.success("New Recipe Created");
      setRecipeData({
        recipeName: "",
        recipeIngredients: [{ ingredientName: "", ingredientQty: "" }],
        recipeInstructions: "",
        recipeDescription: "",
        cookingTime: "",
        dish: "",
      });
      navigate("/dashboard/all-recipe");
      return recipeData;
    } catch (err) {
      console.log(err);
      Array.isArray(err.response.data.message)
        ? toast.error(err.response.data.message[0])
        : toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <Form method='post'>
        <Container maxWidth='xl' className={styles.allRecipeContainer}>
          <h1>Add Recipes</h1>
          <Box>
            <Grid container spacing={3}>
              <Grid sm={12} md={6} lg={6}>
                <Item className={styles.firstInput}>
                  <TextInputComponent
                    label={"Recipe Name"}
                    name={"recipeName"}
                    type={"text"}
                    onChange={handleInputChange}
                    value={recipeData.recipeName}
                  />
                  <TextfieldComponent
                    label={"Recipe Instructions"}
                    name={"recipeInstructions"}
                    type={"text"}
                    handleInputChange={handleInputChange}
                    value={recipeData.recipeInstructions}
                    name={"recipeInstructions"}
                  />
                  <TextfieldComponent
                    label={"Recipe Description"}
                    name={"recipeDescription"}
                    type={"text"}
                    handleInputChange={handleInputChange}
                    value={recipeData.description}
                    name={"recipeDescription"}
                  />
                  <TextInputComponent
                    label={"cooking Time"}
                    name={"cookingTime"}
                    type={"number"}
                    onChange={handleInputChange}
                    value={recipeData.cookingTime}
                  />
                  <Box sx={{ maxWidth: 150 }}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-simple-select-label'>
                        {"Dish"}
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={recipeData.dish}
                        label={"Dish"}
                        name={"dish"}
                        onChange={handleInputChange}
                      >
                        <MenuItem value={dish.PORK}>Pork</MenuItem>
                        <MenuItem value={dish.BEEF}>Beef</MenuItem>
                        <MenuItem value={dish.CHICKEN}>Chicken</MenuItem>
                        <MenuItem value={dish.VEGETARIAN}>Vegetarian</MenuItem>
                        <MenuItem value={dish.FISH}>Fish</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Item>
              </Grid>
              <Grid sm={12} md={6} lg={6}>
                <Box>
                  {recipeData.recipeIngredients.map((newRecipeData, idx) => {
                    return (
                      <div key={idx}>
                        <Item className={styles.ingredients}>
                          <h4>{`Ingredient ${idx + 1}`}</h4>
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
                        </Item>
                      </div>
                    );
                  })}
                  <Box className={styles.ingredientBtn}>
                    {/* Note: add onClick property in ButtonComponent */}
                    <ButtonComponent
                      label={"Add Ingredient"}
                      type={"button"}
                      size={"small"}
                      onClick={addInputField}
                    />
                    <ButtonComponent
                      name={"submit"}
                      size={"small"}
                      type={"submit"}
                      label={"submit"}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Form>
    </>
  );
}
export default AddRecipe2;
