import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

const Navbar = () => {
  const userId = "Nick";
  const [auth, setAuth] = useState(false);
  const classes = useStyles();

  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            component={RouterLink}
            color="inherit"
            underline="none"
            className={classes.title}
          >
            <Typography variant="h6">Fast Flux</Typography>
          </Link>
          {auth ? (
            <>
              <Link
                to={`/users/${userId}`}
                component={RouterLink}
                color="inherit"
              >
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
              </Link>
              <Link
                to="/"
                component={RouterLink}
                color="inherit"
                underline="none"
              >
                <Button color="inherit" onClick={() => setAuth(false)}>
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <Button color="inherit" onClick={() => setAuth(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
