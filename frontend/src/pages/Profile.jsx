//MUI imports
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DashboardContext } from "./DashboardLayout.jsx";
import { useContext } from "react";
import Card from "@mui/material/Card";

import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//component import
import TextInputComponent from "../components/TextInputComponent.jsx";
import ButtonComponent from "../components/ButtonComponent.jsx";

//import CSS
import styles from "../utils/styles/Profile.module.css";

//modifications in the action function to include the submission of file (for the user avatar)
//will not convert formData into an object yet because we might be sending an img file. Multer will convert the file.
export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar"); //avatar is the name of the img file we will send.
  //file exist and size id > 5mb
  if (file && file.size > 500000) {
    toast.error("Image cannot be more than 5mb");
  }
  try {
    await axios.patch("/api/admin/updateUser", formData);
    toast.success("Profile is successfuly updated");
    return redirect("/dashboard/all-recipe");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return null;
  }
};

function Profile() {
  //using context to obtain data passed from the context provider
  const context = useContext(DashboardContext);
  const loggedUser = context;
  // console.log(loggedUser);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Container maxWidth='lg' className='profileContainer'>
      <CssBaseline />
      <Card elevation={20}>
        <Box sx={{ m: 2 }}>
          <h1>Update Profile</h1>
          <Form
            method='post'
            className={styles.profileBox}
            encType='multipart/form-data'
          >
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
            <TextInputComponent
              type={"file"}
              label={"Upload avatar"}
              name={"avatar"}
            />
            <div className={styles.btnContainer}>
              <ButtonComponent
                label={"Update"}
                size={"small"}
                type={"submit"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        </Box>
      </Card>
    </Container>
  );
}
export default Profile;
