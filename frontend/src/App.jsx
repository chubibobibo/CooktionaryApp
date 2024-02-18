import "./App.css";
//react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//component imports
import HomeLayout from "./pages/HomeLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  //instantiate react router using createBrowserRouter (accepts an array of objects)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "login", //no need for "/" because path is relative to parent (HomeLayout)
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
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
