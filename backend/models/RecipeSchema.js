import mongoose from "mongoose";

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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "UserSchema",
    },
    cookingTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } //creates createdAt property for every entry
);

export const RecipeModel = mongoose.model("RecipeModel", RecipeSchema);
