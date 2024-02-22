//MUI imports
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArticleIcon from "@mui/icons-material/Article";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Button from "@mui/material/Button";

import { Link, useNavigate, redirect } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
//CSS styles
import styles from "../utils/styles/DashboardStyles.module.css";

//import MUI components
import {
  openedMixin,
  closedMixin,
  DrawerHeader,
  AppBar,
  Drawer,
} from "../utils/MUIcomponents/NavbarComponents";

function NavbarComponent() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //navigate to a page
  const navigate = useNavigate();

  //function for onClick logout
  const logOutUser = async () => {
    try {
      await axios.get("/api/users/logout");
      navigate("/");
      toast.success("User logged out");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
  };

  //Object containing the pages to load by mapping
  const pages = [
    {
      name: "Add Recipe",
      path: "/dashboard/add-recipe",
      icon: <AddBoxIcon />,
    },
    {
      name: "All Recipes",
      path: "/dashboard/all-recipe",
      icon: <ArticleIcon />,
    },
    {
      name: "profile",
      path: "/dashboard/profile",
      icon: <AccountBoxIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }} variant='h6' noWrap component='div'>
            Cooktionary
          </Typography>
          {/* avatar */}
          <div className={styles.userAvatar}>
            <img className={styles.avatarImg} src='/50955.jpg' alt='image' />
          </div>
          {/* logout button */}
          <Button color='inherit' onClick={logOutUser}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* pages to load */}
          {pages.map((text, index) => (
            <ListItem key={text.name} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(text.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {/* rendering icons of each page */}
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
export default NavbarComponent;
