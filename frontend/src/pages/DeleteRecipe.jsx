import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

//action function to delete
//accepts params in order to send the id to the deleteRecipe API
export const action = async ({ params }) => {
  try {
    await axios.delete(`/api/recipes/${params.id}`);
    toast.success("Recipe deleted");
    return redirect("/dashboard/all-recipe");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function DeleteRecipe() {
  return <div>DeleteJob</div>;
}
export default DeleteRecipe;
