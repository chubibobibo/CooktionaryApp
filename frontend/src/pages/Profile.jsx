//MUI imports
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DashboardContext } from "./DashboardLayout.jsx";
import { useContext } from "react";
import Card from "@mui/material/Card";

import { Form, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//component import
import TextInputComponent from "../components/TextInputComponent.jsx";
import ButtonComponent from "../components/ButtonComponent.jsx";

//import CSS
import styles from "../utils/styles/Profile.module.css";

//action function for submitting the form
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtain data from forms
  const data = Object.fromEntries(formData); //converts the data recieved to usable object
  try {
    await axios.patch("/api/admin/updateUser", data);
    toast.success("User profile updated");
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function Profile() {
  //using context to obtain data passed from the context provider
  const context = useContext(DashboardContext);
  const loggedUser = context;
  // console.log(loggedUser);
  return (
    <Container maxWidth='lg' className='profileContainer'>
      <CssBaseline />
      <Card elevation={20}>
        <Box sx={{ m: 2 }}>
          <h1>Update Profile</h1>
          <Form className={styles.profileBox} method='post'>
            <TextInputComponent
              label={"Name"}
              name={"name"}
              type={"text"}
              defaultValue={loggedUser.data.user.name}
            />
            <TextInputComponent
              label={"Last Name"}
              name={"lastName"}
              type={"text"}
              defaultValue={loggedUser.data.user.lastName}
            />
            <TextInputComponent
              label={"Email"}
              name={"email"}
              type={"email"}
              defaultValue={loggedUser.data.user.email}
            />
            <div className={styles.btnContainer}>
              <ButtonComponent
                label={"Update"}
                size={"small"}
                type={"submit"}
              />
            </div>
          </Form>
        </Box>
      </Card>
    </Container>
  );
}
export default Profile;
