import "./App.css";
//react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//component imports
import HomeLayout from "./pages/HomeLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";
import Admin from "./pages/Admin.jsx";
import Profile from "./pages/Profile.jsx";
import Index from "./pages/Index.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AllRecipe from "./pages/AllRecipe.jsx";
import DeleteJob from "./pages/DeleteRecipe.jsx";
import SingleRecipe from "./pages/SingleRecipe.jsx";
//tem,porary
import AddRecipe2 from "./pages/AddRecipe2.jsx";

//import MUI fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//action and loader function imports
import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { action as updateUserAction } from "./pages/Profile.jsx";
import { action as deleteRecipeAction } from "./pages/DeleteRecipe.jsx";
import { action as createRecipeAction } from "./pages/AddRecipe.jsx";
import { loader as loggedUserLoader } from "./pages/DashboardLayout.jsx";
import { loader as allRecipeLoader } from "./pages/AllRecipe.jsx";
import { loader as SingleRecipeLoader } from "./pages/SingleRecipe.jsx";
import { loader as editRecipe } from "./pages/EditRecipe.jsx";

function App() {
  //instantiate react router using createBrowserRouter (accepts an array of objects)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />, // renders the ErrorPage.jsx
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "login", //no need for "/" because path is relative to parent (HomeLayout)
          element: <Login />,
          action: loginAction,
        },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          loader: loggedUserLoader,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <AllRecipe />,
            },
            {
              path: "add-recipe",
              element: <AddRecipe2 />,
              action: createRecipeAction,
            },
            {
              path: "all-recipe",
              element: <AllRecipe />,
              loader: allRecipeLoader,
            },
            {
              path: "edit-recipe/:id",
              element: <EditRecipe />,
              loader: editRecipe,
            },
            {
              path: "profile",
              element: <Profile />,
              action: updateUserAction,
            },
            {
              path: "admin",
              element: <Admin />,
            },
            {
              path: "delete-job/:id", //url path
              element: <DeleteJob />,
              action: deleteRecipeAction,
            },
            {
              path: ":id",
              element: <SingleRecipe />,
              loader: SingleRecipeLoader,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      {/* Initialize RouterProvider with the created router as props */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
