import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundImage:
      "radial-gradient(farthest-corner at 0px 0px, #202022 0%, #08080a 100%)"
  },
  logo: {
    flexGrow: 1
  },
  navButton: {
    fontFamily: "Roboto"
  },
  navActive: {
    borderBottom: "2px solid #ffe600",
    borderRadius: 0,
    fontFamily: "Roboto"
  },
  shadow: {
    textShadow: "1px 1px #000"
  }
}));

export default ({ headline, subheading, children, height = 480 }) => {
  const classes = useStyles();

  const path = window.location.pathname.split("/").slice(-1)[0];

  return (
    <AppBar
      position="static"
      classes={{ root: classes.appBar }}
      style={{ height }}
    >
      <Toolbar>
        <div className={classes.logo}>
          <a href="/">
            <img src="./logo_white.svg" height="92" alt="Burni Logo" />
          </a>
        </div>
        <Button
          href="/assets"
          color="inherit"
          classes={{
            root: path === "assets" ? classes.navActive : classes.navButton
          }}
        >
          My Assets
        </Button>
        <Button
          href="https://opensea.io/storefront/burnin"
          color="inherit"
          classes={{ root: classes.navButton }}
        >
          Marketplace
        </Button>
      </Toolbar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        style={{ marginTop: "-64px" }}
      >
        <Box paddingX={4}>
          <Typography variant="h2" className={classes.shadow}>
            {headline}
          </Typography>
        </Box>
        <Box paddingX={4}>
          <Typography variant="h6" className={classes.shadow}>
            {subheading}
          </Typography>
        </Box>
        <Box>{children}</Box>
      </Box>
    </AppBar>
  );
};
