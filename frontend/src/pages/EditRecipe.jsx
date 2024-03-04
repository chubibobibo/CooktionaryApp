//Mui imports

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material/";
import ButtonComponent from "../components/ButtonComponent.jsx";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigation, useNavigate, useParams } from "react-router-dom";

//component imports
import TextInputComponent from "../components/TextInputComponent.jsx";
import TextfieldComponent from "../components/TextfieldComponent.jsx";

//CSS imports
import styles from "../utils/styles/AddRecipe.module.css";
import { Item } from "../utils/MUIcomponents/NavbarComponents.js";

import { useLoaderData } from "react-router-dom";

//loader function to call API to get single recipe.
export const loader = async ({ params }) => {
  try {
    const singleRecipeData = await axios.get(`/api/recipes/${params.id}`);
    return singleRecipeData;
  } catch (err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
  }
};

function EditRecipe() {
  //obtaining loader data
  const singleRecipeLoaderData = useLoaderData();
  console.log(singleRecipeLoaderData.data.singleRecipe.recipeIngredients);

  //state to manage changes
  const [recipeData, setRecipeData] = useState({
    recipeName: singleRecipeLoaderData.data.singleRecipe.recipeName,
    recipeIngredients: [
      ...singleRecipeLoaderData.data.singleRecipe.recipeIngredients,
    ],
    recipeInstructions:
      singleRecipeLoaderData.data.singleRecipe.recipeInstructions,
    recipeDescription:
      singleRecipeLoaderData.data.singleRecipe.recipeDescription,
    cookingTime: singleRecipeLoaderData.data.singleRecipe.cookingTime,
    dish: singleRecipeLoaderData.data.singleRecipe.dish,
    // singleRecipeLoaderData,
  });
  // console.log(recipeData);

  //object for the select input
  const dish = {
    PORK: "pork",
    BEEF: "beef",
    CHICKEN: "chicken",
    VEGETARIAN: "vegetarian",
    FISH: "fish",
  };

  //instantiate navigate to a var
  const navigate = useNavigate();

  //input changes handler
  const handleInputChange = (e) => {
    setRecipeData((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
  };

  //handle ingredient name change
  const handleIngredientName = (e, idx) => {
    const newIngredientName = recipeData.recipeIngredients;
    newIngredientName[idx].ingredientName = e.target.value;
    setRecipeData((oldData) => {
      //wae want to change the recipeIngredients(an array) of the oldData with the ingreidentName with the value of newIngredientName.ingredientName
      return {
        ...oldData,
        [oldData.recipeIngredients]: {
          ingredientName: newIngredientName.ingredientName,
        },
      };
    });
  };

  //handle Qty changes
  const handleQty = (e, idx) => {
    const newQty = recipeData.recipeIngredients; //an array
    newQty[idx].ingredientQty = e.target.value;
    setRecipeData((oldData) => {
      return {
        ...oldData,
        [oldData.recipeIngredients]: { ingredientQty: newQty.ingredientQty },
      };
    });
  };

  //adding input field for ingredients
  const addInputField = () => {
    setRecipeData((oldData) => {
      return {
        ...oldData,
        recipeIngredients: [
          ...oldData.recipeIngredients,
          { ingredientName: "", ingredientQty: "" },
        ],
      };
    });
  };

  //handle submission of data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //api to modify single recipe
      await axios.patch(
        `/api/recipes/${singleRecipeLoaderData.data.singleRecipe._id}`,
        recipeData
      );
      toast.success("Recipe updated");
      navigate("/dashboard/all-recipe");
    } catch (err) {
      console.log(err);
      toast.error(
        Array.isArray(err.response.data.message)
          ? err.response.data.message[0]
          : err.response.data.message
      );
    }
  };

  //load data
  // useEffect(() => {
  //   async function getSingleRecipe() {
  //     const singleRecipeData = await axios.get(`/api/recipes/${recipeId}`);
  //     console.log(singleRecipeData);
  //     setRecipeData(singleRecipeData);
  //   }
  //   getSingleRecipe();
  // }, []);

  //submitting state
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method='patch'>
        <Container maxWidth='xl' className={styles.allRecipeContainer}>
          <h1>Add Recipes</h1>
          <Card elevation={20}>
            <Grid container spacing={3} sx={{ m: 1 }}>
              <Grid sm={12} md={6} lg={6}>
                <Item className={styles.firstInput}>
                  <TextInputComponent
                    label={"Recipe Name"}
                    name={"recipeName"}
                    type={"text"}
                    onChange={handleInputChange}
                    value={recipeData.recipeName}
                    // defaultValue={recipeLoaderData.data.singleRecipe.recipeName}
                    // defaultValue={recipeData.recipeName}
                  />
                  <TextfieldComponent
                    label={"Recipe Instructions"}
                    name={"recipeInstructions"}
                    type={"text"}
                    handleInputChange={handleInputChange}
                    value={recipeData.recipeInstructions}
                    // defaultValue={
                    //   recipeLoaderData.data.singleRecipe.recipeInstructions
                    // }
                  />
                  <TextfieldComponent
                    label={"Recipe Description"}
                    name={"recipeDescription"}
                    type={"text"}
                    handleInputChange={handleInputChange}
                    value={recipeData.recipeDescription}
                    // defaultValue={
                    //   recipeLoaderData.data.singleRecipe.recipeDescription
                    // }
                  />
                  <TextInputComponent
                    label={"cooking Time"}
                    name={"cookingTime"}
                    type={"number"}
                    onChange={handleInputChange}
                    value={recipeData.cookingTime}
                    // defaultValue={
                    //   recipeLoaderData.data.singleRecipe.cookingTime
                    // }
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
                <Box elevation={15}>
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
          </Card>
        </Container>
      </Form>
    </>
  );
}
export default EditRecipe;
