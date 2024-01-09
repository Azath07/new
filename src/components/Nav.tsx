// Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemText,
  Container,
  Paper,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <Container
      sx={{
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <AppBar position="fixed" sx={{ width: "100%" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Simple List Table App
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Paper
          elevation={0}
          sx={{
            width: "300px", // Set the width here as per your preference
            padding: "16px",
          }}
        >
          <List>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Features" />
            </ListItemButton>
          </List>
        </Paper>
      </Drawer>
    </Container>
  );
};

export default Navbar;
