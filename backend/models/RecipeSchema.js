import mongoose from "mongoose";
//import for dish options enum
import { dish } from "../utils/constants.js";

const { Schema } = mongoose;

const RecipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    recipeIngredients: [
      {
        ingredientName: {
          type: String,
          required: true,
        },
        ingredientQty: {
          type: String,
          required: true,
        },
      },
    ],
    recipeInstructions: {
      type: String,
      required: true,
    },
    recipeDescription: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "UserSchema",
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    dish: {
      type: String,
      enum: Object.values(dish),
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    avatarPublicId: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true } //creates createdAt property for every entry
);

export const RecipeModel = mongoose.model("RecipeModel", RecipeSchema);
